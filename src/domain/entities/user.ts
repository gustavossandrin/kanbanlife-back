import Entity from '../contracts/entity';
import EntityError from '../errors/entity-error';
import { userSchema, UserSchema } from '../schemas/user-schema';

export default class User extends Entity implements UserSchema {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public photo: string | null,
    public createdAt: Date,
    public updatedAt: Date,
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
