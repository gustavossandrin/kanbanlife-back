import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaskPositionInput {
  @IsUUID('4', { message: 'Column ID must be a valid UUID' })
  columnId: string;

  @IsNumber({}, { message: 'Top position must be a number' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  topPosition?: number | null;

  @IsNumber({}, { message: 'Bottom position must be a number' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  bottomPosition?: number | null;
} 