import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/shared/either';
import TaskRepository from '@/domain/repositories/task-repository';
import { TaskNotFound } from '@/domain/errors/task/task-not-found';

@Injectable()
export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<Either<TaskNotFound, void>> {
    const task = await this.taskRepository.getById(taskId);

    if (!task) {
      return left(new TaskNotFound());
    }

    await this.taskRepository.delete(taskId);

    return right(undefined);
  }
} 