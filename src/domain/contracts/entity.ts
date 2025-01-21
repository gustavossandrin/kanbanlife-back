import EntityError from '../errors/entity-error';

export default abstract class Entity {
  id!: unknown;
  createdAt!: Date;
  updatedAt!: Date;

  abstract validate(): EntityError | null;
}
