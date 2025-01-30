import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Label } from '../../../domain/entities/label.entity';
import LabelRepository from '../../../domain/repositories/label-repository';

@Injectable()
export class LabelRepositoryPrisma extends LabelRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  private mapToEntity(data: any): Label {
    return new Label(
      data.title,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async save(entity: Label): Promise<Label> {
    const data = await this.prisma.label.create({
      data: {
        id: entity.id,
        title: entity.title,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }
    });
    return this.mapToEntity(data);
  }

  async getById(id: string): Promise<Label | null> {
    const data = await this.prisma.label.findUnique({
      where: { id }
    });
    return data ? this.mapToEntity(data) : null;
  }

  async update(entity: Label): Promise<Label> {
    const data = await this.prisma.label.update({
      where: { id: entity.id },
      data: {
        title: entity.title,
        updatedAt: new Date()
      }
    });
    return this.mapToEntity(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.label.delete({
      where: { id }
    });
  }

  async getAll(): Promise<Label[]> {
    const data = await this.prisma.label.findMany();
    return data.map(label => this.mapToEntity(label));
  }

  async findByTaskId(taskId: string): Promise<Label[]> {
    const data = await this.prisma.label.findMany({
      where: {
        tasks: {
          some: {
            id: taskId
          }
        }
      }
    });
    return data.map(label => this.mapToEntity(label));
  }
} 