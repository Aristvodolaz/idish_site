import { IsString, IsOptional, IsIn } from 'class-validator';

export class CorrectTextDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsIn(['en', 'ru'])
  targetLang?: string;
}
