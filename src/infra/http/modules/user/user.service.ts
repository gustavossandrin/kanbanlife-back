import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../../../domain/repositories/user-repository';
import { User } from '../../../../domain/entities/user.entity';
import { CreateUserInput } from '../../shared/inputs/user/create-user.input';
import { UpdateUserInput } from '../../shared/inputs/user/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = new User();
    Object.assign(user, createUserInput);
    return this.userRepository.create(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return this.userRepository.update(id, updateUserInput);
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
} 