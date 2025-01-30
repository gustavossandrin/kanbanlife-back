import { randomUUID } from 'crypto';
import Entity from '../contracts/entity';
import { columnSchema } from '../schemas/column.schema';
import type { z } from 'zod';
import EntityError from '../errors/entity-error';
import { Project } from './project.entity';
import { Task } from './task.entity';

export type ColumnSchema = z.infer<typeof columnSchema>;

export class Column extends Entity implements ColumnSchema {
  constructor(
    public name: string,
    public maxTasks: number,
    public position: number,
    public code: number,
    public projectId: string,
    public id: string = randomUUID(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super();
  }

  validate() {
    const validation = columnSchema.safeParse(this);

    if (!validation.success) {
      const fieldsErrors = validation.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};

      for (const field in fieldsErrors) {
        errors[field] = fieldsErrors[field][0];
      }

      return new EntityError('Invalid column', errors);
    }

    Object.assign(this, validation.data);

    return null;
  }

  project?: Project;
  tasks?: Task[];
} 