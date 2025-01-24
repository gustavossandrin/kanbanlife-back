import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITaskRepository } from '../../../../domain/repositories/task-repository';
import { Task } from '../../../../domain/entities/task.entity';
import { TaskColor } from '../../../../domain/enums/task-color.enum';

@Injectable()
export class TaskRepositoryPrisma implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  private mapToTask(data: any): Task {
    return {
      ...data,
      color: TaskColor[data.color as keyof typeof TaskColor]
    };
  }

  async findByColumnId(columnId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({ 
      where: { columnId },
      orderBy: { position: 'asc' },
      include: { labels: true }
    });
    return tasks.map(this.mapToTask);
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ 
      where: { id },
      include: { labels: true }
    });
    return task ? this.mapToTask(task) : null;
  }

  async create(data: Task): Promise<Task> {
    const { labels, column, columnId, ...taskData } = data;
    const task = await this.prisma.task.create({ 
      data: {
        ...taskData,
        column: { connect: { id: columnId } },
        labels: {
          connect: labels?.map(label => ({ id: label.id }))
        }
      },
      include: { labels: true }
    });
    return this.mapToTask(task);
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const { labels, column, columnId, ...taskData } = data;
    const task = await this.prisma.task.update({ 
      where: { id },
      data: {
        ...taskData,
        ...(columnId && { column: { connect: { id: columnId } } }),
        ...(labels && { labels: { set: labels.map(label => ({ id: label.id })) } })
      },
      include: { labels: true }
    });
    return this.mapToTask(task);
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
} 