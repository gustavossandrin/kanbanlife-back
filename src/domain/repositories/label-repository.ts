import Repository from '../contracts/repository';
import { Label } from '../entities/label.entity';

export default abstract class LabelRepository implements Repository<Label> {
  abstract save(entity: Label): Promise<Label>;
  abstract update(entity: Label): Promise<Label>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<Label | null>;
  abstract getAll(): Promise<Label[]>;
  abstract findByTaskId(taskId: string): Promise<Label[]>;
} 