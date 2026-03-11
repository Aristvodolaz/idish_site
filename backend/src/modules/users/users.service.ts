import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create new user
  async create(data: {
    email: string;
    passwordHash: string;
    firstName?: string;
    lastName?: string;
    interfaceLang?: string;
  }) {
    const user = await this.prisma.user.create({
      data,
    });

    // Create user statistics
    await this.prisma.userStatistics.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  }

  // Find user by ID
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        interfaceLang: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Find user by email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Update user profile
  async update(id: string, data: {
    firstName?: string;
    lastName?: string;
    interfaceLang?: string;
  }) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        interfaceLang: true,
        updatedAt: true,
      },
    });
  }

  // Delete user
  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
