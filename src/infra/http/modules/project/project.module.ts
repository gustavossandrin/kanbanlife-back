import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { ProjectRepositoryPrisma } from '../../../persistence/prisma/repositories/project-repository-prisma';

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    PrismaService,
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepositoryPrisma,
    },
  ],
  exports: [ProjectService],
})
export class ProjectModule {} 