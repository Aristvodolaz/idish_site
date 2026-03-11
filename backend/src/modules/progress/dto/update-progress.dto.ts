import { IsBoolean, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class UpdateProgressDto {
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number;

  @IsNumber()
  @Min(0)
  timeSpent: number;
}
