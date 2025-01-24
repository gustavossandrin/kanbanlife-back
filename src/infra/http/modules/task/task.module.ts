import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { TaskRepositoryPrisma } from '../../../persistence/prisma/repositories/task-repository-prisma';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    PrismaService,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepositoryPrisma,
    },
  ],
  exports: [TaskService],
})
export class TaskModule {} 