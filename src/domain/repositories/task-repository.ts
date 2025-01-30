import Repository from '../contracts/repository';
import { Task } from '../entities/task.entity';

export default abstract class TaskRepository implements Repository<Task> {
  abstract save(entity: Task): Promise<Task>;
  abstract update(entity: Task): Promise<Task>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<Task | null>;
  abstract getAll(): Promise<Task[]>;
  abstract findByColumnId(columnId: string): Promise<Task[]>;
  abstract updatePosition(id: string, position: number): Promise<void>;
} 