import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Column } from '../../../domain/entities/column.entity';
import ColumnRepository from '../../../domain/repositories/column-repository';

@Injectable()
export class ColumnRepositoryPrisma extends ColumnRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  private mapToEntity(data: any): Column {
    return new Column(
      data.name,
      data.maxTasks,
      data.position,
      data.projectId,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async save(entity: Column): Promise<Column> {
    const data = await this.prisma.column.create({
      data: {
        id: entity.id,
        name: entity.name,
        maxTasks: entity.maxTasks,
        position: entity.position,
        projectId: entity.projectId,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }
    });
    return this.mapToEntity(data);
  }

  async getById(id: string): Promise<Column | null> {
    const data = await this.prisma.column.findUnique({
      where: { id }
    });
    return data ? this.mapToEntity(data) : null;
  }

  async update(entity: Column): Promise<Column> {
    const data = await this.prisma.column.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        maxTasks: entity.maxTasks,
        position: entity.position,
        projectId: entity.projectId,
        updatedAt: new Date()
      }
    });
    return this.mapToEntity(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.column.delete({
      where: { id }
    });
  }

  async getAll(): Promise<Column[]> {
    const data = await this.prisma.column.findMany();
    return data.map(column => this.mapToEntity(column));
  }

  async findByProjectId(projectId: string): Promise<Column[]> {
    const data = await this.prisma.column.findMany({
      where: { projectId }
    });
    return data.map(column => this.mapToEntity(column));
  }

  async updatePosition(id: string, position: number): Promise<void> {
    await this.prisma.column.update({
      where: { id },
      data: { 
        position,
        updatedAt: new Date()
      }
    });
  }
} 