import Entity from './entity';

export default interface Repository<T extends Entity> {
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  getAll(): Promise<T[]>;
}
