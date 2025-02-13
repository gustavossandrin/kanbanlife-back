import { Inject, Injectable } from '@nestjs/common';
import ProjectRepository from '@/domain/repositories/project-repository';
import { Project } from '@/domain/entities/project.entity';
import { Column } from '@/domain/entities/column.entity';

interface CreateProjectRequest {
  name: string;
  userId: string;
  columns: {
    name: string;
    maxTasks?: number | null;
    position: number;
  }[];
}

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(request: CreateProjectRequest): Promise<Project> {
    const { name, userId, columns } = request;

    const project = new Project(
      name,
      userId
    );

    const projectColumns = columns.map((column, index) => {
      const mappedColumn = new Column(
        column.name,
        column.maxTasks ?? 0,
        column.position,
        project.id
      );

      return mappedColumn;
    });

    project.columns = projectColumns;

    const validationError = project.validate();
    if (validationError) {
      throw validationError;
    }

    return this.projectRepository.save(project);
  }
} 