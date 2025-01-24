import { Repository } from './base/repository';
import { Task } from '../entities/task.entity';

export interface ITaskRepository extends Repository<Task> {
  findByColumnId(columnId: string): Promise<Task[]>;
  updatePosition(id: string, position: number): Promise<void>;
} 