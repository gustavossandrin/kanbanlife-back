import { Injectable, ValidationError } from "@nestjs/common";
import { Either, left, right } from '@/shared/either';
import { UpdateTaskInput } from '@/shared/inputs/task/update-task-input';
import { Task } from '@/domain/entities/task.entity';
import TaskRepository from '@/domain/repositories/task-repository';
import { TaskNotFound } from '@/domain/errors/task/task-not-found';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    taskId: string,
    input: UpdateTaskInput,
  ): Promise<Either<TaskNotFound | ValidationError, Task>> {
    const task = await this.taskRepository.getById(taskId);

    if (!task) {
      return left(new TaskNotFound());
    }

    task.title = input.title;
    task.description = input.description;
    task.color = input.color;
    task.labels = input.labels;

    const validationError = task.validate();
    if (validationError) {
      return left(validationError);
    }

    await this.taskRepository.update(task);

    return right(task);
  }
} 