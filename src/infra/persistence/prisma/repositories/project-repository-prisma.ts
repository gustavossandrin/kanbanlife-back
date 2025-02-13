import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import ProjectRepository from '../../../../domain/repositories/project-repository';
import { Project } from '../../../../domain/entities/project.entity';
import { Column } from '../../../../domain/entities/column.entity';
import { Task } from '../../../../domain/entities/task.entity';

@Injectable()
export class ProjectRepositoryPrisma implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(data: any): Project {
    const project = new Project(
      data.name,
      data.userId,
      data.id,
      data.createdAt,
      data.updatedAt,
    );

    if (data.columns) {
      project.columns = data.columns.map((column: any) => {
        const mappedColumn = new Column(
          column.name,
          column.maxTasks,
          column.position,
          project.id,
          column.id,
          column.createdAt,
          column.updatedAt,
        );

        if (column.tasks) {
          mappedColumn.tasks = column.tasks
            .sort((a: any, b: any) => b.position - a.position)
            .map(
              (task: any) =>
                new Task(
                  task.title,
                  task.color,
                  task.columnId,
                  task.description,
                  task.labels,
                  task.position,
                  task.id,
                  task.createdAt,
                  task.updatedAt,
                ),
            );
        }

        return mappedColumn;
      });
    }

    return project;
  }

  async findByUserId(userId: string): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({ where: { userId } });
    return projects.map((project) => this.mapToEntity(project));
  }

  async getById(id: string, userId: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id, userId },
      include: {
        columns: {
          include: {
            tasks: {
              orderBy: {
                position: 'desc',
              },
            },
          },
        },
      },
    });
    return project ? this.mapToEntity(project) : null;
  }

  async save(entity: Project): Promise<Project> {
    const { columns, user, userId, ...data } = entity as any;
    const project = await this.prisma.project.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
        columns: columns && {
          create: columns.map(
            ({ id, createdAt, updatedAt, projectId, ...column }) =>
              column,
          ),
        },
      },
      include: {
        columns: true,
      },
    });

    return this.mapToEntity(project);
  }

  async update(entity: Project): Promise<Project> {
    const { columns, user, ...data } = entity as any;
    console.log('columns', columns)
    const project = await this.prisma.project.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        updatedAt: entity.updatedAt,
        user: { connect: { id: data.userId } },
        columns: {
          deleteMany: {
            id: {notIn: columns.map(col => col.id)}, 
            projectId: entity.id,
          },
          upsert: columns.map(col => ({
            where: {id: col.id},
            create: {
              name: col.name, maxTasks: col.maxTasks, position: col.position, createdAt: col.createdAt,
              updatedAt: col.updatedAt,
            },
            update: {
              name: col.name, maxTasks: col.maxTasks, position: col.position, createdAt: col.createdAt,
            }
          }))
        }
      },
    });
    return this.mapToEntity(project);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.project.delete({ where: { id, userId } });
  }

  async getAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany();
    return projects.map((project) => this.mapToEntity(project));
  }
}
