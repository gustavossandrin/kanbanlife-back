import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { PrismaService } from '@/infra/persistence/prisma/prisma.service';
import { ProjectRepositoryPrisma } from '@/infra/persistence/prisma/repositories/project-repository-prisma';
import { CreateProjectUseCase } from '@/app/usecases/project/create-project';
import { FindProjectsByUserUseCase } from '@/app/usecases/project/find-projects-by-user';

@Module({
  controllers: [ProjectController],
  providers: [
    PrismaService,
    CreateProjectUseCase,
    FindProjectsByUserUseCase,
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepositoryPrisma,
    },
  ],
})
export class ProjectModule {} 