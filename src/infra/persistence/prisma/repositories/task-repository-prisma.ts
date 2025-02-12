import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import TaskRepository from '../../../../domain/repositories/task-repository';
import { Task } from '../../../../domain/entities/task.entity';
import { TaskColor } from '../../../../domain/enums/task-color.enum';

@Injectable()
export class TaskRepositoryPrisma implements TaskRepository {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(data: any): Task {
    return new Task(
      data.title,
      data.color as TaskColor,
      data.columnId,
      data.description,
      data.labels,
      data.position,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByColumnId(columnId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({ 
      where: { columnId },
      orderBy: { position: 'asc' }
    });
    return tasks.map(task => this.mapToEntity(task));
  }

  async getById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    return task ? this.mapToEntity(task) : null;
  }

  async save(entity: Task): Promise<Task> {
    const data = entity as any;
    const task = await this.prisma.task.create({ 
      data: {
        id: data.id,
        title: data.title,
        position: data.position,
        color: data.color,
        columnId: data.columnId,
        description: data.description,
        labels: data.labels,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
    });
    return this.mapToEntity(task);
  }

  async update(entity: Task): Promise<Task> {
    const data = entity as any;
    const task = await this.prisma.task.update({ 
      where: { id: entity.id },
      data: {
        title: data.title,
        color: data.color,
        description: data.description,
        labels: data.labels,
        updatedAt: new Date()
      }
    });
    return this.mapToEntity(task);
  }

  async updatePosition(id: string, position: number): Promise<void> {
    await this.prisma.task.update({
      where: { id },
      data: { position }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }

  async getAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks.map(task => this.mapToEntity(task));
  }
} 