import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ILabelRepository } from '../../../../domain/repositories/label-repository';
import { Label } from '../../../../domain/entities/label.entity';

@Injectable()
export class LabelRepositoryPrisma implements ILabelRepository {
  constructor(private prisma: PrismaService) {}

  async findByTaskId(taskId: string): Promise<Label[]> {
    return this.prisma.label.findMany({
      where: {
        tasks: {
          some: { id: taskId }
        }
      }
    });
  }

  async findById(id: string): Promise<Label | null> {
    return this.prisma.label.findUnique({ where: { id } });
  }

  async create(data: Label): Promise<Label> {
    const { tasks, ...labelData } = data;
    return this.prisma.label.create({
      data: {
        ...labelData,
        tasks: tasks?.length ? { connect: tasks.map(task => ({ id: task.id })) } : undefined
      }
    });
  }

  async update(id: string, data: Partial<Label>): Promise<Label> {
    const { tasks, ...labelData } = data;
    return this.prisma.label.update({
      where: { id },
      data: {
        ...labelData,
        tasks: tasks?.length ? { set: tasks.map(task => ({ id: task.id })) } : undefined
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.label.delete({ where: { id } });
  }
} 