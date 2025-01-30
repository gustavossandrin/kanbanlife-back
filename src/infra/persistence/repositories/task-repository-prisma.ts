import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '../../../domain/entities/task.entity';
import TaskRepository from '../../../domain/repositories/task-repository';

@Injectable()
export class TaskRepositoryPrisma extends TaskRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  private mapToEntity(data: any): Task {
    return new Task(
      data.title,
      data.position,
      data.color,
      data.columnId,
      data.description,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async save(entity: Task): Promise<Task> {
    const data = await this.prisma.task.create({
      data: {
        id: entity.id,
        title: entity.title,
        position: entity.position,
        color: entity.color,
        columnId: entity.columnId,
        description: entity.description,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }
    });
    return this.mapToEntity(data);
  }

  async getById(id: string): Promise<Task | null> {
    const data = await this.prisma.task.findUnique({
      where: { id }
    });
    return data ? this.mapToEntity(data) : null;
  }

  async update(entity: Task): Promise<Task> {
    const data = await this.prisma.task.update({
      where: { id: entity.id },
      data: {
        title: entity.title,
        position: entity.position,
        color: entity.color,
        columnId: entity.columnId,
        description: entity.description,
        updatedAt: new Date()
      }
    });
    return this.mapToEntity(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id }
    });
  }

  async getAll(): Promise<Task[]> {
    const data = await this.prisma.task.findMany();
    return data.map(task => this.mapToEntity(task));
  }

  async findByColumnId(columnId: string): Promise<Task[]> {
    const data = await this.prisma.task.findMany({
      where: { columnId }
    });
    return data.map(task => this.mapToEntity(task));
  }

  async updatePosition(id: string, position: number): Promise<void> {
    await this.prisma.task.update({
      where: { id },
      data: { 
        position,
        updatedAt: new Date()
      }
    });
  }
} 