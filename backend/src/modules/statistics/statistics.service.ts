import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  // Get user statistics (creates record if missing)
  async getUserStatistics(userId: string) {
    // Ensure UserStatistics exists (upsert)
    const stats = await this.prisma.userStatistics.upsert({
      where: { userId },
      create: {
        userId,
      },
      update: {},
    });

    // Get additional stats
    const [completedLessons, totalWords, learnedWords, testsPassed, totalLessons] =
      await Promise.all([
        this.prisma.progress.count({
          where: { userId, completed: true },
        }),
        this.prisma.flashcard.count({
          where: { userId },
        }),
        this.prisma.flashcard.count({
          where: { userId, repetitions: { gte: 3 } },
        }),
        this.prisma.testResult.count({
          where: { userId, passed: true },
        }),
        this.prisma.lesson.count({
          where: { isPublished: true },
        }),
      ]);

    // Update statistics
    await this.prisma.userStatistics.update({
      where: { userId },
      data: {
        completedLessons,
        learnedWords,
        totalWords,
      },
    });

    return {
      ...stats,
      completedLessons,
      totalWords,
      learnedWords,
      testsPassed,
      totalLessons,
    };
  }

  // Update study streak
  async updateStreak(userId: string) {
    const stats = await this.prisma.userStatistics.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastStudy = stats.lastStudyDate
      ? new Date(stats.lastStudyDate)
      : null;

    if (lastStudy) {
      lastStudy.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor(
        (today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24),
      );

      let newStreak = stats.currentStreak;

      if (daysDiff === 0) {
        // Same day, no change
      } else if (daysDiff === 1) {
        // Consecutive day
        newStreak += 1;
      } else {
        // Streak broken
        newStreak = 1;
      }

      const longestStreak = Math.max(stats.longestStreak, newStreak);

      await this.prisma.userStatistics.update({
        where: { userId },
        data: {
          currentStreak: newStreak,
          longestStreak,
          lastStudyDate: new Date(),
        },
      });

      return { currentStreak: newStreak, longestStreak };
    }

    // First study
    await this.prisma.userStatistics.update({
      where: { userId },
      data: {
        currentStreak: 1,
        longestStreak: 1,
        lastStudyDate: new Date(),
      },
    });

    return { currentStreak: 1, longestStreak: 1 };
  }

  // Add study time
  async addStudyTime(userId: string, minutes: number) {
    const stats = await this.prisma.userStatistics.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    await this.prisma.userStatistics.update({
      where: { userId },
      data: {
        totalStudyTime: stats.totalStudyTime + minutes,
      },
    });

    // Update streak
    await this.updateStreak(userId);

    return { totalStudyTime: stats.totalStudyTime + minutes };
  }

  // Get learning progress over time
  async getProgressOverTime(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const progress = await this.prisma.progress.findMany({
      where: {
        userId,
        completedAt: {
          gte: startDate,
        },
      },
      orderBy: { completedAt: 'asc' },
      select: {
        completedAt: true,
        score: true,
        lesson: {
          select: {
            title: true,
            type: true,
          },
        },
      },
    });

    return progress;
  }

  // Get test results over time
  async getTestResults(userId: string, limit: number = 10) {
    return this.prisma.testResult.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: limit,
      include: {
        test: {
          select: {
            title: true,
            titleEn: true,
            titleRu: true,
            type: true,
          },
        },
      },
    });
  }
}
