import { Inject, Injectable } from '@nestjs/common';
import ProjectRepository from '@/domain/repositories/project-repository';
import { Project } from '@/domain/entities/project.entity';
import { Either, left, right } from '@/shared/either';
import ProjectNotFoundError from '@/domain/errors/project/project-not-found';


@Injectable()
export class FindProjectByIdUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(id: string, userId: string): Promise<Either<ProjectNotFoundError, Project>> {
    const project = await this.projectRepository.getById(id, userId);

    if (!project) {
      return left(new ProjectNotFoundError());
    }

    return right(project);
  }
} 