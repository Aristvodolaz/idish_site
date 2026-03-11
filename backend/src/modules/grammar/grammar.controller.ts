import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('grammar')
@UseGuards(JwtAuthGuard)
export class GrammarController {
  constructor(private grammarService: GrammarService) {}

  // Get all grammar rules
  @Get()
  async findAll(
    @Query('level') level?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.grammarService.findAll({
      level: level ? parseInt(level) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  // Get grammar by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.grammarService.findById(id);
  }

  // Get grammar by level
  @Get('level/:level')
  async findByLevel(@Param('level') level: string) {
    return this.grammarService.findByLevel(parseInt(level));
  }
}
