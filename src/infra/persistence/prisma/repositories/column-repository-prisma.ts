import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IColumnRepository } from '../../../../domain/repositories/column-repository';
import { Column } from '../../../../domain/entities/column.entity';

@Injectable()
export class ColumnRepositoryPrisma implements IColumnRepository {
  constructor(private prisma: PrismaService) {}

  async findByProjectId(projectId: string): Promise<Column[]> {
    return this.prisma.column.findMany({ 
      where: { projectId },
      orderBy: { position: 'asc' }
    });
  }

  async updatePosition(id: string, position: number): Promise<void> {
    await this.prisma.column.update({
      where: { id },
      data: { position }
    });
  }

  async findById(id: string): Promise<Column | null> {
    return this.prisma.column.findUnique({ where: { id } });
  }

  async create(data: Column): Promise<Column> {
    const { tasks, project, projectId, ...columnData } = data;
    return this.prisma.column.create({
      data: {
        ...columnData,
        project: { connect: { id: projectId } }
      }
    });
  }

  async update(id: string, data: Partial<Column>): Promise<Column> {
    const { tasks, project, projectId, ...columnData } = data;
    return this.prisma.column.update({ 
      where: { id }, 
      data: {
        ...columnData,
        ...(projectId && { project: { connect: { id: projectId } } })
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.column.delete({ where: { id } });
  }
} 