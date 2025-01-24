import Repository from '../contracts/repository';
import User from '../entities/user';

export default abstract class UserRepository implements Repository<User> {
  abstract save(entity: User): Promise<User>;
  abstract update(entity: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<User | null>;
  abstract getAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
}
