import { IsNumber, Min, Max } from 'class-validator';

export class ReviewFlashcardDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  quality: number; // 0: Again, 1-2: Hard, 3-4: Good, 5: Easy
}
