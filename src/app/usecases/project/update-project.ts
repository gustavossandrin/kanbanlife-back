import { Inject, Injectable, ValidationError } from "@nestjs/common";
import ProjectRepository from "@/domain/repositories/project-repository";
import { UpdateProjectInput } from "@/shared/inputs/project/update-project-input";
import { Either, left, right } from "@/shared/either";
import ProjectNotFoundError from "@/domain/errors/project/project-not-found";
import { Project } from "@/domain/entities/project.entity";
import { Column } from "@/domain/entities/column.entity";
import { randomUUID } from "crypto";

@Injectable()
export class UpdateProjectUseCase{
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
    project: UpdateProjectInput
  ): Promise<Either<ProjectNotFoundError | ValidationError, Promise<Project>>>{

    const updateProject = new Project(
      project.name,
      userId,
      id
    );

    updateProject.columns = project.columns.map((column, index) => {
      return new Column(
        column.name,
        column.maxTasks ?? 0,
        column.position,
        index + 1,
        id,
        column.id ?? randomUUID(),
      );
    });

    const validationError = updateProject.validate();
    if (validationError) {
      return left(validationError);
    }

    return right(this.projectRepository.update(updateProject))
  }
}