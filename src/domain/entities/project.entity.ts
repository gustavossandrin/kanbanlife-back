import { Entity } from './base/entity';
import { User } from './user.entity';
import { Column } from './column.entity';

export class Project extends Entity {
  name: string;
  userId: string;
  user?: User;
  columns?: Column[];
  createdAt: Date;
  updatedAt: Date;
} 