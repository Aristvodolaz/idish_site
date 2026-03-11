import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddStudyTimeDto } from './dto/add-study-time.dto';

@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  // Get user statistics
  @Get('me')
  async getMyStatistics(@Request() req) {
    return this.statisticsService.getUserStatistics(req.user.userId);
  }

  // Update study streak
  @Post('streak')
  async updateStreak(@Request() req) {
    return this.statisticsService.updateStreak(req.user.userId);
  }

  // Add study time
  @Post('study-time')
  async addStudyTime(@Request() req, @Body() dto: AddStudyTimeDto) {
    return this.statisticsService.addStudyTime(req.user.userId, dto.minutes);
  }

  // Get progress over time
  @Get('progress')
  async getProgressOverTime(@Request() req, @Query('days') days?: string) {
    return this.statisticsService.getProgressOverTime(
      req.user.userId,
      days ? parseInt(days) : undefined,
    );
  }

  // Get test results
  @Get('tests')
  async getTestResults(@Request() req, @Query('limit') limit?: string) {
    return this.statisticsService.getTestResults(
      req.user.userId,
      limit ? parseInt(limit) : undefined,
    );
  }
}
