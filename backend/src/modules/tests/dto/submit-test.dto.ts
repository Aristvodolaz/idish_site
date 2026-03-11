import { IsNumber, IsObject, Min, Max } from 'class-validator';

export class SubmitTestDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;

  @IsObject()
  answers: any;

  @IsNumber()
  @Min(0)
  timeSpent: number;
}
