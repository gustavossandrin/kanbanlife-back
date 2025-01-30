import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import LabelRepository from '../../../../domain/repositories/label-repository';
import { Label } from '../../../../domain/entities/label.entity';

@Injectable()
export class LabelRepositoryPrisma implements LabelRepository {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(data: any): Label {
    return new Label(
      data.title,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByTaskId(taskId: string): Promise<Label[]> {
    const labels = await this.prisma.label.findMany({
      where: {
        tasks: {
          some: { id: taskId }
        }
      }
    });
    return labels.map(label => this.mapToEntity(label));
  }

  async getById(id: string): Promise<Label | null> {
    const label = await this.prisma.label.findUnique({ where: { id } });
    return label ? this.mapToEntity(label) : null;
  }

  async save(entity: Label): Promise<Label> {
    const { tasks, ...data } = entity as any;
    const label = await this.prisma.label.create({
      data: {
        ...data,
        tasks: tasks?.length ? { connect: tasks.map(task => ({ id: task.id })) } : undefined
      }
    });
    return this.mapToEntity(label);
  }

  async update(entity: Label): Promise<Label> {
    const { tasks, ...data } = entity as any;
    const label = await this.prisma.label.update({
      where: { id: entity.id },
      data: {
        ...data,
        tasks: tasks?.length ? { set: tasks.map(task => ({ id: task.id })) } : undefined
      }
    });
    return this.mapToEntity(label);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.label.delete({ where: { id } });
  }

  async getAll(): Promise<Label[]> {
    const labels = await this.prisma.label.findMany();
    return labels.map(label => this.mapToEntity(label));
  }
} 