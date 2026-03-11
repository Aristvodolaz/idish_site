import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('phrases')
@UseGuards(JwtAuthGuard)
export class PhrasesController {
  constructor(private phrasesService: PhrasesService) {}

  // Get all phrases with filters
  @Get()
  async findAll(
    @Query('level') level?: string,
    @Query('category') category?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.phrasesService.findAll({
      level: level ? parseInt(level) : undefined,
      category,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  // Get phrase by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.phrasesService.findById(id);
  }

  // Get phrases by category
  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    return this.phrasesService.findByCategory(category);
  }
}
