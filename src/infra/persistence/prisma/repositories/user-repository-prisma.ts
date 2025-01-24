import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from '../../../../domain/repositories/user-repository';
import { User } from '../../../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryPrisma implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: User): Promise<User> {
    const { projects, ...userData } = data;
    return this.prisma.user.create({ data: userData });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const { projects, ...userData } = data;
    return this.prisma.user.update({ where: { id }, data: userData });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
} 