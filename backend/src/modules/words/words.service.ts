import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  // Get all words with optional filters
  async findAll(params?: {
    level?: number;
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const { level, category, search, limit = 50, offset = 0 } = params || {};

    const where: any = {};

    if (level) {
      where.level = level;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { hebrew: { contains: search } },
        { translationEn: { contains: search, mode: 'insensitive' } },
        { translationRu: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [words, total] = await Promise.all([
      this.prisma.word.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { level: 'asc' },
      }),
      this.prisma.word.count({ where }),
    ]);

    return {
      words,
      total,
      limit,
      offset,
    };
  }

  // Get word by ID
  async findById(id: string) {
    return this.prisma.word.findUnique({
      where: { id },
    });
  }

  // Get random words for practice
  async getRandomWords(count: number = 10, level?: number) {
    const where = level ? { level } : {};

    const totalWords = await this.prisma.word.count({ where });

    const skip = Math.floor(Math.random() * Math.max(0, totalWords - count));

    return this.prisma.word.findMany({
      where,
      take: count,
      skip,
    });
  }

  // Get words by category
  async findByCategory(category: string) {
    return this.prisma.word.findMany({
      where: { category },
      orderBy: { level: 'asc' },
    });
  }

  // Get words by level
  async findByLevel(level: number) {
    return this.prisma.word.findMany({
      where: { level },
    });
  }
}
