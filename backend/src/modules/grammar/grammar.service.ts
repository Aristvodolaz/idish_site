import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GrammarService {
  constructor(private prisma: PrismaService) {}

  // Get all grammar rules
  async findAll(params?: { level?: number; limit?: number; offset?: number }) {
    const { level, limit = 50, offset = 0 } = params || {};

    const where: any = {};

    if (level) {
      where.level = level;
    }

    const [grammar, total] = await Promise.all([
      this.prisma.grammar.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: [{ level: 'asc' }, { order: 'asc' }],
      }),
      this.prisma.grammar.count({ where }),
    ]);

    return {
      grammar,
      total,
      limit,
      offset,
    };
  }

  // Get grammar by ID
  async findById(id: string) {
    return this.prisma.grammar.findUnique({
      where: { id },
    });
  }

  // Get grammar by level
  async findByLevel(level: number) {
    return this.prisma.grammar.findMany({
      where: { level },
      orderBy: { order: 'asc' },
    });
  }
}
