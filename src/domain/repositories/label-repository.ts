import { Repository } from './base/repository';
import { Label } from '../entities/label.entity';

export interface ILabelRepository extends Repository<Label> {
  findByTaskId(taskId: string): Promise<Label[]>;
} 