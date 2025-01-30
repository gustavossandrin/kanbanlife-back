import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../../domain/entities/user.entity';
import UserRepository from '../../../domain/repositories/user-repository';

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

  async save(entity: User): Promise<User> {
    const data = await this.prisma.user.create({
      data: {
        id: entity.id,
        email: entity.email,
        password: entity.password,
        firstName: entity.firstName,
        lastName: entity.lastName,
        photo: entity.photo,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }
    });
    return this.mapToEntity(data);
  }

  async getById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { id }
    });
    return data ? this.mapToEntity(data) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { email }
    });
    return data ? this.mapToEntity(data) : null;
  }

  async update(entity: User): Promise<User> {
    const data = await this.prisma.user.update({
      where: { id: entity.id },
      data: {
        email: entity.email,
        password: entity.password,
        firstName: entity.firstName,
        lastName: entity.lastName,
        photo: entity.photo,
        updatedAt: new Date()
      }
    });
    return this.mapToEntity(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }

  async getAll(): Promise<User[]> {
    const data = await this.prisma.user.findMany();
    return data.map(user => this.mapToEntity(user));
  }
}
