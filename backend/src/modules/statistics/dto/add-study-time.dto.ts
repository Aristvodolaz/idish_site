import { IsNumber, Min } from 'class-validator';

export class AddStudyTimeDto {
  @IsNumber()
  @Min(1)
  minutes: number;
}
