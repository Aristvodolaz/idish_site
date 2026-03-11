import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { WordsService } from './words.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('words')
@UseGuards(JwtAuthGuard)
export class WordsController {
  constructor(private wordsService: WordsService) {}

  // Get all words with filters
  @Get()
  async findAll(
    @Query('level') level?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.wordsService.findAll({
      level: level ? parseInt(level) : undefined,
      category,
      search,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  // Get word by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.wordsService.findById(id);
  }

  // Get random words for practice
  @Get('random/:count')
  async getRandomWords(
    @Param('count') count: string,
    @Query('level') level?: string,
  ) {
    return this.wordsService.getRandomWords(
      parseInt(count),
      level ? parseInt(level) : undefined,
    );
  }

  // Get words by category
  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    return this.wordsService.findByCategory(category);
  }
}
