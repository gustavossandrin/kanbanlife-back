import Repository from '../contracts/repository';
import { Project } from '../entities/project.entity';

export default abstract class ProjectRepository implements Repository<Project> {
  abstract save(entity: Project): Promise<Project>;
  abstract update(entity: Project): Promise<Project>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string, userId: string): Promise<Project | null>;
  abstract getAll(): Promise<Project[]>;
  abstract findByUserId(userId: string): Promise<Project[]>;
} 