import { Injectable, Inject } from '@nestjs/common';
import { IColumnRepository } from '../../../../domain/repositories/column-repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from '../../../../domain/entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @Inject('IColumnRepository')
    private readonly columnRepository: IColumnRepository,
  ) {}

  async create(createColumnDto: CreateColumnDto): Promise<Column> {
    const column = new Column();
    Object.assign(column, createColumnDto);
    return this.columnRepository.create(column);
  }

  async findByProjectId(projectId: string): Promise<Column[]> {
    return this.columnRepository.findByProjectId(projectId);
  }

  async findOne(id: string): Promise<Column> {
    const column = await this.columnRepository.findById(id);
    if (!column) {
      throw new Error('Column not found');
    }
    return column;
  }

  async update(id: string, updateColumnDto: UpdateColumnDto): Promise<Column> {
    return this.columnRepository.update(id, updateColumnDto);
  }

  async updatePosition(id: string, position: number): Promise<void> {
    return this.columnRepository.updatePosition(id, position);
  }

  async remove(id: string): Promise<void> {
    return this.columnRepository.delete(id);
  }
} 