import { Repository } from './base/repository';
import { Column } from '../entities/column.entity';

export interface IColumnRepository extends Repository<Column> {
  findByProjectId(projectId: string): Promise<Column[]>;
  updatePosition(id: string, position: number): Promise<void>;
} 