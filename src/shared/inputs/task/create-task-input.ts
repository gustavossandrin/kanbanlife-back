import { TaskColor } from '@/domain/enums/task-color.enum';
import { IsArray, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateTaskInput {
  @IsString({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Description is required' })
  description: string;

  @IsEnum(TaskColor, { message: 'Color is required' })
  color: TaskColor;

  @IsUUID('4', { message: 'Column ID must be a valid UUID' })  
  columnId: string;

  @IsArray({ message: 'Labels must be an array' })
  @IsString({ each: true, message: 'Labels must be strings' })
  labels: string[];
} 
