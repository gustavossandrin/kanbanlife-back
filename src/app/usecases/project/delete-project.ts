import { Inject, Injectable } from '@nestjs/common';
import ProjectRepository from '@/domain/repositories/project-repository';
import ProjectNotFoundError from '@/domain/errors/project/project-not-found';
import { Either, left, right } from "@/shared/either";

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(id: string, userId: string): Promise<Either<ProjectNotFoundError, null>> {
    const project  = await this.projectRepository.getById(id, userId);

    if (!project){
      return left(new ProjectNotFoundError())
    }

    await this.projectRepository.delete(id, userId);

    return right(null)
  }
}
