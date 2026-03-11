import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  // Get all published lessons
  async findAll(params?: {
    type?: string;
    level?: number;
    limit?: number;
    offset?: number;
  }) {
    const { type, level, limit = 50, offset = 0 } = params || {};

    const where: any = { isPublished: true };

    if (type) {
      where.type = type;
    }

    if (level) {
      where.level = level;
    }

    const [lessons, total] = await Promise.all([
      this.prisma.lesson.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: [{ level: 'asc' }, { order: 'asc' }],
        include: {
          lessonWords: {
            include: {
              word: true,
            },
            orderBy: { order: 'asc' },
          },
          lessonPhrases: {
            include: {
              phrase: true,
            },
            orderBy: { order: 'asc' },
          },
          lessonGrammar: {
            include: {
              grammar: true,
            },
            orderBy: { order: 'asc' },
          },
        },
      }),
      this.prisma.lesson.count({ where }),
    ]);

    return {
      lessons,
      total,
      limit,
      offset,
    };
  }

  // Get lesson by ID
  async findById(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: {
        lessonWords: {
          include: {
            word: true,
          },
          orderBy: { order: 'asc' },
        },
        lessonPhrases: {
          include: {
            phrase: true,
          },
          orderBy: { order: 'asc' },
        },
        lessonGrammar: {
          include: {
            grammar: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  // Get lessons by type
  async findByType(type: string) {
    return this.prisma.lesson.findMany({
      where: {
        type,
        isPublished: true,
      },
      orderBy: [{ level: 'asc' }, { order: 'asc' }],
    });
  }

  // Get lessons by level
  async findByLevel(level: number) {
    return this.prisma.lesson.findMany({
      where: {
        level,
        isPublished: true,
      },
      orderBy: { order: 'asc' },
    });
  }
}
