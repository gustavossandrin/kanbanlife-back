import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '../../../domain/entities/project.entity';
import ProjectRepository from '../../../domain/repositories/project-repository';

@Injectable()
export class ProjectRepositoryPrisma extends ProjectRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  private mapToEntity(data: any): Project {
    return new Project(
      data.name,
      data.userId,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async save(entity: Project): Promise<Project> {
    const data = await this.prisma.project.create({
      data: {
        id: entity.id,
        name: entity.name,
        userId: entity.userId,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }
    });
    return this.mapToEntity(data);
  }

  async getById(id: string): Promise<Project | null> {
    const data = await this.prisma.project.findUnique({
      where: { id }
    });
    return data ? this.mapToEntity(data) : null;
  }

  async update(entity: Project): Promise<Project> {
    const data = await this.prisma.project.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        userId: entity.userId,
        updatedAt: new Date()
      }
    });
    return this.mapToEntity(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id }
    });
  }

  async getAll(): Promise<Project[]> {
    const data = await this.prisma.project.findMany();
    return data.map(project => this.mapToEntity(project));
  }

  async findByUserId(userId: string): Promise<Project[]> {
    const data = await this.prisma.project.findMany({
      where: { userId }
    });
    return data.map(project => this.mapToEntity(project));
  }
} 