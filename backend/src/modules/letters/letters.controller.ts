import { Controller, Get, UseGuards } from '@nestjs/common';
import { LettersService } from './letters.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('letters')
@UseGuards(JwtAuthGuard)
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @Get()
  async findAll() {
    return this.lettersService.findAll();
  }
}
