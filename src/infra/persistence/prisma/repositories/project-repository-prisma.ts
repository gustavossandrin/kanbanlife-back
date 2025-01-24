import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IProjectRepository } from '../../../../domain/repositories/project-repository';
import { Project } from '../../../../domain/entities/project.entity';

@Injectable()
export class ProjectRepositoryPrisma implements IProjectRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({ where: { userId } });
  }

  async findById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async create(data: Project): Promise<Project> {
    const { columns, user, userId, ...projectData } = data;
    return this.prisma.project.create({
      data: {
        ...projectData,
        user: { connect: { id: userId } }
      }
    });
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const { columns, user, userId, ...projectData } = data;
    return this.prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        ...(userId && { user: { connect: { id: userId } } })
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }
} 