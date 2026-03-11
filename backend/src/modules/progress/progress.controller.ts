import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ReviewFlashcardDto } from './dto/review-flashcard.dto';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  // Get user progress
  @Get('me')
  async getMyProgress(@Request() req) {
    return this.progressService.getUserProgress(req.user.userId);
  }

  // Get lesson progress
  @Get('lesson/:lessonId')
  async getLessonProgress(@Request() req, @Param('lessonId') lessonId: string) {
    return this.progressService.getLessonProgress(req.user.userId, lessonId);
  }

  // Update lesson progress
  @Post('lesson/:lessonId')
  async updateProgress(
    @Request() req,
    @Param('lessonId') lessonId: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.progressService.updateProgress({
      userId: req.user.userId,
      lessonId,
      completed: dto.completed,
      score: dto.score,
      timeSpent: dto.timeSpent,
    });
  }

  // Get due flashcards
  @Get('flashcards/due')
  async getDueFlashcards(@Request() req, @Query('limit') limit?: string) {
    return this.progressService.getDueFlashcards(
      req.user.userId,
      limit ? parseInt(limit) : undefined,
    );
  }

  // Review flashcard
  @Post('flashcards/:wordId/review')
  async reviewFlashcard(
    @Request() req,
    @Param('wordId') wordId: string,
    @Body() dto: ReviewFlashcardDto,
  ) {
    return this.progressService.reviewFlashcard(
      req.user.userId,
      wordId,
      dto.quality,
    );
  }

  // Get flashcard statistics
  @Get('flashcards/stats')
  async getFlashcardStats(@Request() req) {
    return this.progressService.getFlashcardStats(req.user.userId);
  }
}
