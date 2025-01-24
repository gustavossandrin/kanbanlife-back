import { Entity } from './base/entity';
import { Project } from './project.entity';
import { Task } from './task.entity';

export class Column extends Entity {
  name: string;
  maxTasks: number;
  position: number;
  code: number;
  projectId: string;
  project?: Project;
  tasks?: Task[];
  createdAt: Date;
  updatedAt: Date;
} 