import { Entity } from './base/entity';
import { Task } from './task.entity';

export class Label extends Entity {
  title: string;
  tasks?: Task[];
  createdAt: Date;
  updatedAt: Date;
} 