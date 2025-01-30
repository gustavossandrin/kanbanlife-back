import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { TaskRepositoryPrisma } from '../../../persistence/prisma/repositories/task-repository-prisma';

@Module({
  controllers: [TaskController],
  providers: [
    PrismaService,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepositoryPrisma,
    },
  ],
  exports: [],
})
export class TaskModule {} 