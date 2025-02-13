import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import ColumnRepository from '../../../../domain/repositories/column-repository';
import { Column } from '../../../../domain/entities/column.entity';

@Injectable()
export class ColumnRepositoryPrisma implements ColumnRepository {
  constructor(private prisma: PrismaService) {}

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

  async findByProjectId(projectId: string): Promise<Column[]> {
    const columns = await this.prisma.column.findMany({ 
      where: { projectId },
      orderBy: { position: 'asc' }
    });
    return columns.map(column => this.mapToEntity(column));
  }

  async updatePosition(id: string, position: number): Promise<void> {
    await this.prisma.column.update({
      where: { id },
      data: { position }
    });
  }

  async getById(id: string): Promise<Column | null> {
    const column = await this.prisma.column.findUnique({ where: { id } });
    return column ? this.mapToEntity(column) : null;
  }

  async save(entity: Column): Promise<Column> {
    const { tasks, project, ...data } = entity as any;
    const column = await this.prisma.column.create({
      data: {
        ...data,
        project: { connect: { id: data.projectId } }
      }
    });
    return this.mapToEntity(column);
  }

  async update(entity: Column): Promise<Column> {
    const { tasks, project, ...data } = entity as any;
    const column = await this.prisma.column.update({ 
      where: { id: entity.id }, 
      data: {
        ...data,
        project: { connect: { id: data.projectId } }
      }
    });
    return this.mapToEntity(column);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.column.delete({ where: { id } });
  }

  async getAll(): Promise<Column[]> {
    const columns = await this.prisma.column.findMany();
    return columns.map(column => this.mapToEntity(column));
  }
} 