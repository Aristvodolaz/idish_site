import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  // Get user progress for all lessons
  async getUserProgress(userId: string) {
    return this.prisma.progress.findMany({
      where: { userId },
      include: {
        lesson: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Get user progress for specific lesson
  async getLessonProgress(userId: string, lessonId: string) {
    return this.prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      include: {
        lesson: true,
      },
    });
  }

  // Update lesson progress
  async updateProgress(data: {
    userId: string;
    lessonId: string;
    completed: boolean;
    score?: number;
    timeSpent: number;
  }) {
    const existingProgress = await this.prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId: data.userId,
          lessonId: data.lessonId,
        },
      },
    });

    if (existingProgress) {
      return this.prisma.progress.update({
        where: {
          userId_lessonId: {
            userId: data.userId,
            lessonId: data.lessonId,
          },
        },
        data: {
          completed: data.completed,
          score: data.score,
          timeSpent: existingProgress.timeSpent + data.timeSpent,
          completedAt: data.completed ? new Date() : existingProgress.completedAt,
        },
      });
    }

    return this.prisma.progress.create({
      data: {
        userId: data.userId,
        lessonId: data.lessonId,
        completed: data.completed,
        score: data.score,
        timeSpent: data.timeSpent,
        completedAt: data.completed ? new Date() : null,
      },
    });
  }

  // Get flashcards due for review
  async getDueFlashcards(userId: string, limit: number = 20) {
    return this.prisma.flashcard.findMany({
      where: {
        userId,
        nextReview: {
          lte: new Date(),
        },
      },
      include: {
        word: true,
      },
      take: limit,
      orderBy: { nextReview: 'asc' },
    });
  }

  // Update flashcard after review (SM-2 algorithm)
  async reviewFlashcard(
    userId: string,
    wordId: string,
    quality: number, // 0-5 (Again, Hard, Good, Easy)
  ) {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
    });

    if (!flashcard) {
      // Create new flashcard
      return this.prisma.flashcard.create({
        data: {
          userId,
          wordId,
          nextReview: this.calculateNextReview(1),
          interval: 1,
          easeFactor: 2.5,
          repetitions: 1,
          lastReview: new Date(),
        },
      });
    }

    // SM-2 algorithm
    let { easeFactor, interval, repetitions } = flashcard;

    if (quality >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);

    return this.prisma.flashcard.update({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
      data: {
        nextReview: this.calculateNextReview(interval),
        interval,
        easeFactor,
        repetitions,
        lastReview: new Date(),
      },
    });
  }

  // Calculate next review date
  private calculateNextReview(intervalDays: number): Date {
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + intervalDays);
    return nextReview;
  }

  // Get flashcard statistics
  async getFlashcardStats(userId: string) {
    const total = await this.prisma.flashcard.count({
      where: { userId },
    });

    const due = await this.prisma.flashcard.count({
      where: {
        userId,
        nextReview: {
          lte: new Date(),
        },
      },
    });

    const learned = await this.prisma.flashcard.count({
      where: {
        userId,
        repetitions: {
          gte: 3,
        },
      },
    });

    return {
      total,
      due,
      learned,
    };
  }
}
