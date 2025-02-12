import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { PrismaService } from '@/infra/persistence/prisma/prisma.service';
import { ProjectRepositoryPrisma } from '@/infra/persistence/prisma/repositories/project-repository-prisma';
import { CreateProjectUseCase } from '@/app/usecases/project/create-project';
import { FindProjectsByUserUseCase } from '@/app/usecases/project/find-projects-by-user';
import { FindProjectByIdUseCase } from '@/app/usecases/project/find-by-id';
import { DeleteProjectUseCase } from "@/app/usecases/project/delete-project";
import { UpdateProjectUseCase } from "@/app/usecases/project/update-project";

@Module({
  controllers: [ProjectController],
  providers: [
    PrismaService,
    CreateProjectUseCase,
    FindProjectsByUserUseCase,
    FindProjectByIdUseCase,
    DeleteProjectUseCase,
    UpdateProjectUseCase,
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepositoryPrisma,
    },
  ],
})
export class ProjectModule {} 