import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import UserRepository from '../../../../domain/repositories/user-repository';
import { User } from '../../../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(data: any): User {
    return new User(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.photo,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.mapToEntity(user) : null;
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.mapToEntity(user) : null;
  }

  async save(entity: User): Promise<User> {
    const data = entity as any;
    const user = await this.prisma.user.create({ data });
    return this.mapToEntity(user);
  }

  async update(entity: User): Promise<User> {
    const data = entity as any;
    const user = await this.prisma.user.update({
      where: { id: entity.id },
      data
    });
    return this.mapToEntity(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => this.mapToEntity(user));
  }
} 