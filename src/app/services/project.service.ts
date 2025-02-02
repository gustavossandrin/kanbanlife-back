import { Inject, Injectable } from '@nestjs/common';
import ProjectRepository from '../../domain/repositories/project-repository';
import { Project } from '../../domain/entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async findByUserId(userId: string): Promise<Project[]> {
    return this.projectRepository.findByUserId(userId);
  }
} 