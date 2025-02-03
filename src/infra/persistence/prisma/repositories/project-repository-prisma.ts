import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import ProjectRepository from '../../../../domain/repositories/project-repository';
import { Project } from '../../../../domain/entities/project.entity';

@Injectable()
export class ProjectRepositoryPrisma implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(data: any): Project {
    return new Project(
      data.name,
      data.userId,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByUserId(userId: string): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({ where: { userId } });
    return projects.map(project => this.mapToEntity(project));
  }

  async getById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    return project ? this.mapToEntity(project) : null;
  }

  async save(entity: Project): Promise<Project> {
    const { columns, user, userId, ...data } = entity as any;
    const project = await this.prisma.project.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId
          }
        },
        columns: columns && {
          create: columns.map(({ id, createdAt, updatedAt, code, projectId, ...column }) => column)
        }
      },
      include: {
        columns: true
      }
    });

    return this.mapToEntity(project);
  }

  async update(entity: Project): Promise<Project> {
    const { columns, user, ...data } = entity as any;
    const project = await this.prisma.project.update({
      where: { id: entity.id },
      data: {
        ...data,
        user: { connect: { id: data.userId } }
      }
    });
    return this.mapToEntity(project);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }

  async getAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany();
    return projects.map(project => this.mapToEntity(project));
  }
} 