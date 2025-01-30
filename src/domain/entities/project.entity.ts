import { randomUUID } from 'crypto';
import Entity from '../contracts/entity';
import { projectSchema } from '../schemas/project.schema';
import type { z } from 'zod';
import EntityError from '../errors/entity-error';
import { User } from './user.entity';
import { Column } from './column.entity';

export type ProjectSchema = z.infer<typeof projectSchema>;

export class Project extends Entity implements ProjectSchema {
  constructor(
    public name: string,
    public userId: string,
    public id: string = randomUUID(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super();
  }

  validate() {
    const validation = projectSchema.safeParse(this);

    if (!validation.success) {
      const fieldsErrors = validation.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};

      for (const field in fieldsErrors) {
        errors[field] = fieldsErrors[field][0];
      }

      return new EntityError('Invalid project', errors);
    }

    Object.assign(this, validation.data);

    return null;
  }

  user?: User;
  columns?: Column[];
} 