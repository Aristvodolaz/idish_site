import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('lessons')
@UseGuards(JwtAuthGuard)
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  // Get all lessons with filters
  @Get()
  async findAll(
    @Query('type') type?: string,
    @Query('level') level?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.lessonsService.findAll({
      type,
      level: level ? parseInt(level) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  // Get lesson by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.lessonsService.findById(id);
  }

  // Get lessons by type
  @Get('type/:type')
  async findByType(@Param('type') type: string) {
    return this.lessonsService.findByType(type);
  }

  // Get lessons by level
  @Get('level/:level')
  async findByLevel(@Param('level') level: string) {
    return this.lessonsService.findByLevel(parseInt(level));
  }
}
