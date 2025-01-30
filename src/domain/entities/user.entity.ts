import { randomUUID } from 'crypto';
import Entity from '../contracts/entity';
import { userSchema, UserSchema } from '../schemas/user-schema';
import EntityError from '../errors/entity-error';

export class User extends Entity implements UserSchema{
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public photo?: string,
    public id: string = randomUUID(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super();
  }

  validate() {
    const validation = userSchema.safeParse(this);

    if (!validation.success) {
      const fieldsErrors = validation.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};

      for (const field in fieldsErrors) {
        errors[field] = fieldsErrors[field][0];
      }

      return new EntityError('Invalid user', errors);
    }

    Object.assign(this, validation.data);

    return null;
  }
} 