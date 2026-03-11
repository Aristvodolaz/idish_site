import { IsString, IsOptional, IsIn } from 'class-validator';

export class ExplainWordDto {
  @IsString()
  word: string;

  @IsOptional()
  @IsIn(['en', 'ru'])
  targetLang?: string;
}
