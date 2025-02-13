import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/shared/either';
import TaskRepository from '@/domain/repositories/task-repository';
import { UpdateTaskPositionInput } from '@/shared/inputs/task/update-task-position-input';
import { Task } from '@/domain/entities/task.entity';
import { TaskNotFound } from '@/domain/errors/task/task-not-found';

@Injectable()
export class UpdateTaskPositionUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    taskId: string,
    input: UpdateTaskPositionInput,
  ): Promise<Either<TaskNotFound, Task>> {
    const task = await this.taskRepository.getById(taskId);

    if (!task) {
      return left(new TaskNotFound());
    }

    let newPosition: number;

    if (input.topPosition === null) {
      if (input.bottomPosition === null) {
        newPosition = 0;
      } else {
        newPosition = input.bottomPosition + 1;
      }
    } else if (input.bottomPosition === null) {
      newPosition = input.topPosition - 1;
    } else {
      newPosition = (input.topPosition + input.bottomPosition) / 2;
    }

    task.columnId = input.columnId;
    task.position = newPosition;

    const updatedTask = await this.taskRepository.update(task);

    return right(updatedTask);
  }
} 