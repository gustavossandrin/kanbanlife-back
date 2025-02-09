import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { CreateTaskUseCase } from '@/app/usecases/task/create-task';
import { UpdateTaskUseCase } from '@/app/usecases/task/update-task';
import { UpdateTaskPositionUseCase } from '@/app/usecases/task/update-task-position';
import { DeleteTaskUseCase } from '@/app/usecases/task/delete-task';
import { PrismaModule } from '@/infra/persistence/prisma/prisma.module';
import TaskRepository from '@/domain/repositories/task-repository';
import { TaskRepositoryPrisma } from '@/infra/persistence/prisma/repositories/task-repository-prisma';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    UpdateTaskUseCase,
    UpdateTaskPositionUseCase,
    DeleteTaskUseCase,
    {
      provide: TaskRepository,
      useClass: TaskRepositoryPrisma,
    },
  ],
})
export class TaskModule {} 