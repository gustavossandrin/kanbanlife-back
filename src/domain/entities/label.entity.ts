import { randomUUID } from 'crypto';
import Entity from '../contracts/entity';
import { labelSchema } from '../schemas/label.schema';
import type { z } from 'zod';
import EntityError from '../errors/entity-error';
import { Task } from './task.entity';

export type LabelSchema = z.infer<typeof labelSchema>;

export class Label extends Entity implements LabelSchema {
  constructor(
    public title: string,
    public id: string = randomUUID(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super();
  }

  validate() {
    const validation = labelSchema.safeParse(this);

    if (!validation.success) {
      const fieldsErrors = validation.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};

      for (const field in fieldsErrors) {
        errors[field] = fieldsErrors[field][0];
      }

      return new EntityError('Invalid label', errors);
    }

    Object.assign(this, validation.data);

    return null;
  }

  tasks?: Task[];
} 