import { IsString, IsNumber, IsOptional, IsIn, Min, Max } from 'class-validator';

export class GenerateExercisesDto {
  @IsString()
  topic: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  level: number;

  @IsOptional()
  @IsIn(['en', 'ru'])
  targetLang?: string;
}
