import { TaskColor } from '@/domain/enums/task-color.enum';
import { IsArray, IsEnum, IsString } from 'class-validator';

export class UpdateTaskInput {
  @IsString({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Description is required' })
  description: string;

  @IsEnum(TaskColor, { message: 'Color is required' })
  color: TaskColor;

  @IsArray({ message: 'Labels must be an array' })
  @IsString({ each: true, message: 'Labels must be strings' })
  labels: string[];
} 