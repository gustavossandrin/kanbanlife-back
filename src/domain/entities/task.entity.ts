import { randomUUID } from 'crypto';
import Entity from '../contracts/entity';
import { taskSchema } from '../schemas/task.schema';
import type { z } from 'zod';
import EntityError from '../errors/entity-error';
import { TaskColor } from '../enums/task-color.enum';

export type TaskSchema = z.infer<typeof taskSchema>;

export class Task extends Entity implements TaskSchema {
  constructor(
    public title: string,
    public color: TaskColor,
    public columnId: string,
    public description?: string,
    public labels?: string[],
    public position: number = 0,
    public id: string = randomUUID(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super();
  }

  validate() {
    const validation = taskSchema.safeParse(this);

    if (!validation.success) {
      const fieldsErrors = validation.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};

      for (const field in fieldsErrors) {
        errors[field] = fieldsErrors[field][0];
      }

      return new EntityError('Invalid task', errors);
    }

    Object.assign(this, validation.data);

    return null;
  }
} 