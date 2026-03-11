import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubmitTestDto } from './dto/submit-test.dto';

@Controller('tests')
@UseGuards(JwtAuthGuard)
export class TestsController {
  constructor(private testsService: TestsService) {}

  // Get all tests
  @Get()
  async findAll(@Query('level') level?: string, @Query('type') type?: string) {
    return this.testsService.findAll({
      level: level ? parseInt(level) : undefined,
      type,
    });
  }

  // Get user test results (must be before :id to avoid "results" being matched as id)
  @Get('results/me')
  async getMyResults(@Request() req, @Query('testId') testId?: string) {
    return this.testsService.getUserResults(req.user.userId, testId);
  }

  // Get test by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.testsService.findById(id);
  }

  // Submit test result
  @Post(':id/submit')
  async submitResult(
    @Request() req,
    @Param('id') testId: string,
    @Body() dto: SubmitTestDto,
  ) {
    return this.testsService.submitResult({
      userId: req.user.userId,
      testId,
      score: dto.score,
      answersJson: dto.answers,
      timeSpent: dto.timeSpent,
    });
  }
}
