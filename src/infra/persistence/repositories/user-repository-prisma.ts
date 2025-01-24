import { PrismaClient } from '@prisma/client';
import User from 'src/domain/entities/user';
import { User as UserPrisma } from '@prisma/client';
import UserRepository from 'src/domain/repositories/user-repository';

export default class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(entity: User): Promise<User> {
    const userData = await this.prisma.user.create({
      data: entity,
    });
    return this.mapToEntity(userData);
  }

  async update(entity: User): Promise<User> {
    const userData = await this.prisma.user.update({
      where: { id: entity.id },
      data: entity,
    });
    return this.mapToEntity(userData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getById(id: string): Promise<User> {
    const userData = await this.prisma.user.findUnique({
      where: { id },
    });
    return this.mapToEntity(userData);
  }

  async getAll(): Promise<User[]> {
    const usersData = await this.prisma.user.findMany();
    return usersData.map(this.mapToEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email },
    });
    return this.mapToEntity(userData);
  }

  private mapToEntity(user: UserPrisma): User {
    return new User(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.photo,
      user.createdAt,
      user.updatedAt,
    );
  }
}
