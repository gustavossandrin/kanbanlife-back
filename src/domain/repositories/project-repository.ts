import { Repository } from './base/repository';
import { Project } from '../entities/project.entity';

export interface IProjectRepository extends Repository<Project> {
  findByUserId(userId: string): Promise<Project[]>;
} 