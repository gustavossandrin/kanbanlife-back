import { Entity } from './base/entity';
import { Project } from './project.entity';

export class User extends Entity {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: string;
  projects?: Project[];
  createdAt: Date;
  updatedAt: Date;
} 