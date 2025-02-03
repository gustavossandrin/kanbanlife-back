import { Inject, Injectable } from '@nestjs/common';
import ProjectRepository from '@/domain/repositories/project-repository';
import { Project } from '@/domain/entities/project.entity';

interface FindProjectsByUserRequest {
  userId: string;
}

@Injectable()
export class FindProjectsByUserUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(request: FindProjectsByUserRequest): Promise<Project[]> {
    const { userId } = request;
    return this.projectRepository.findByUserId(userId);
  }
} 