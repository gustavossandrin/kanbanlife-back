import { Repository } from './base/repository';
import { User } from '../entities/user.entity';

export interface IUserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}
