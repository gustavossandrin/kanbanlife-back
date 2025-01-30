import Repository from '../contracts/repository';
import { User } from '../entities/user.entity';

export default abstract class UserRepository implements Repository<User> {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(entity: User): Promise<User>;
  abstract getById(id: string): Promise<User | null>;
  abstract update(entity: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract getAll(): Promise<User[]>;
}