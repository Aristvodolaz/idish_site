import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LettersService {
  constructor(private prisma: PrismaService) {}

  // Get all Hebrew letters in order
  async findAll() {
    return this.prisma.letter.findMany({
      orderBy: { order: 'asc' },
    });
  }
}
