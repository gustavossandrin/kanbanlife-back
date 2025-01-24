import { Injectable, Inject } from '@nestjs/common';
import { IProjectRepository } from '../../../../domain/repositories/project-repository';
import { CreateProjectInput } from '../../shared/inputs/project/create-project.input';
import { UpdateProjectInput } from '../../shared/inputs/project/update-project.input';
import { Project } from '../../../../domain/entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async create(createProjectDto: CreateProjectInput): Promise<Project> {
    const project = new Project();
    Object.assign(project, createProjectDto);
    return this.projectRepository.create(project);
  }

  async findByUserId(userId: string): Promise<Project[]> {
    return this.projectRepository.findByUserId(userId);
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectInput): Promise<Project> {
    return this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: string): Promise<void> {
    return this.projectRepository.delete(id);
  }
} 