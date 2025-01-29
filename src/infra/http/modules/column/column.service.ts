import { Injectable, Inject } from '@nestjs/common';
import { IColumnRepository } from '../../../../domain/repositories/column-repository';
import { Column } from '../../../../domain/entities/column.entity';
import { CreateColumnInput } from '../../shared/inputs/column/create-column.input';
import { UpdateColumnInput } from '../../shared/inputs/column/update-column.input';

@Injectable()
export class ColumnService {
  constructor(
    @Inject('IColumnRepository')
    private readonly columnRepository: IColumnRepository,
  ) {}

  async create(createColumnInput: CreateColumnInput): Promise<Column> {
    const column = new Column();
    Object.assign(column, createColumnInput);
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

  async update(id: string, updateColumnInput: UpdateColumnInput): Promise<Column> {
    return this.columnRepository.update(id, updateColumnInput);
  }

  async updatePosition(id: string, position: number): Promise<void> {
    return this.columnRepository.updatePosition(id, position);
  }

  async remove(id: string): Promise<void> {
    return this.columnRepository.delete(id);
  }
} 