import { Entity } from './base/entity';
import { Column } from './column.entity';
import { Label } from './label.entity';
import { TaskColor } from '../enums/task-color.enum';

export class Task extends Entity {
  title: string;
  description?: string;
  position: number;
  color: TaskColor;
  columnId: string;
  column?: Column;
  labels?: Label[];
  createdAt: Date;
  updatedAt: Date;
} 