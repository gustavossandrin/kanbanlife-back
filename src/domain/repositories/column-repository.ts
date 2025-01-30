import Repository from '../contracts/repository';
import { Column } from '../entities/column.entity';

export default abstract class ColumnRepository implements Repository<Column> {
  abstract save(entity: Column): Promise<Column>;
  abstract update(entity: Column): Promise<Column>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<Column | null>;
  abstract getAll(): Promise<Column[]>;
  abstract findByProjectId(projectId: string): Promise<Column[]>;
  abstract updatePosition(id: string, position: number): Promise<void>;
} 