import { z } from 'zod';
import { TaskColor } from '../enums/task-color.enum';

export const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  position: z.number().min(0),
  color: z.nativeEnum(TaskColor),
  columnId: z.string().uuid()
}); 