import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { ProjectRepositoryPrisma } from '../../../persistence/prisma/repositories/project-repository-prisma';
import { ProjectService } from '../../../../app/services/project.service';

@Module({
  controllers: [ProjectController],
  providers: [
    PrismaService,
    ProjectService,
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepositoryPrisma,
    },
  ],
  exports: [],
})
export class ProjectModule {} 