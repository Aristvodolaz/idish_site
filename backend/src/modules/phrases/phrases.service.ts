import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PhrasesService {
  constructor(private prisma: PrismaService) {}

  // Get all phrases with optional filters
  async findAll(params?: {
    level?: number;
    category?: string;
    limit?: number;
    offset?: number;
  }) {
    const { level, category, limit = 50, offset = 0 } = params || {};

    const where: any = {};

    if (level) {
      where.level = level;
    }

    if (category) {
      where.category = category;
    }

    const [phrases, total] = await Promise.all([
      this.prisma.phrase.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { level: 'asc' },
      }),
      this.prisma.phrase.count({ where }),
    ]);

    return {
      phrases,
      total,
      limit,
      offset,
    };
  }

  // Get phrase by ID
  async findById(id: string) {
    return this.prisma.phrase.findUnique({
      where: { id },
    });
  }

  // Get phrases by category
  async findByCategory(category: string) {
    return this.prisma.phrase.findMany({
      where: { category },
      orderBy: { level: 'asc' },
    });
  }

  // Get phrases by level
  async findByLevel(level: number) {
    return this.prisma.phrase.findMany({
      where: { level },
    });
  }
}
