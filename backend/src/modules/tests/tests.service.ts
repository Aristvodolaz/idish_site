import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}

  // Get all published tests
  async findAll(params?: { level?: number; type?: string }) {
    const { level, type } = params || {};

    const where: any = { isPublished: true };

    if (level) {
      where.level = level;
    }

    if (type) {
      where.type = type;
    }

    return this.prisma.test.findMany({
      where,
      orderBy: { level: 'asc' },
    });
  }

  // Get test by ID
  async findById(id: string) {
    return this.prisma.test.findUnique({
      where: { id },
    });
  }

  // Submit test result
  async submitResult(data: {
    userId: string;
    testId: string;
    score: number;
    answersJson: any;
    timeSpent: number;
  }) {
    const test = await this.prisma.test.findUnique({
      where: { id: data.testId },
    });

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    const passed = data.score >= test.passingScore;

    return this.prisma.testResult.create({
      data: {
        userId: data.userId,
        testId: data.testId,
        score: data.score,
        answersJson: data.answersJson,
        timeSpent: data.timeSpent,
        passed,
      },
    });
  }

  // Get user test results
  async getUserResults(userId: string, testId?: string) {
    const where: any = { userId };

    if (testId) {
      where.testId = testId;
    }

    return this.prisma.testResult.findMany({
      where,
      include: {
        test: true,
      },
      orderBy: { completedAt: 'desc' },
    });
  }
}
