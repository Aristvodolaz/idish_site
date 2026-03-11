import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatDto } from './dto/chat.dto';
import { ExplainWordDto } from './dto/explain-word.dto';
import { CorrectTextDto } from './dto/correct-text.dto';
import { GenerateExercisesDto } from './dto/generate-exercises.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private aiService: AiService) {}

  // Chat with AI tutor
  @Post('chat')
  async chat(@Request() req, @Body() dto: ChatDto) {
    return this.aiService.chat(req.user.userId, dto.message, dto.context);
  }

  // Explain word
  @Post('explain')
  async explainWord(@Body() dto: ExplainWordDto) {
    return this.aiService.explainWord(dto.word, dto.targetLang);
  }

  // Correct text
  @Post('correct')
  async correctText(@Body() dto: CorrectTextDto) {
    return this.aiService.correctText(dto.text, dto.targetLang);
  }

  // Generate exercises
  @Post('exercises')
  async generateExercises(@Body() dto: GenerateExercisesDto) {
    return this.aiService.generateExercises(
      dto.topic,
      dto.level,
      dto.targetLang,
    );
  }

  // Get chat history
  @Get('history')
  async getChatHistory(@Request() req) {
    return this.aiService.getChatHistory(req.user.userId);
  }

  // Clear chat history
  @Delete('history')
  async clearChatHistory(@Request() req) {
    return this.aiService.clearChatHistory(req.user.userId);
  }
}
