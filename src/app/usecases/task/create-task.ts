import { Task } from "@/domain/entities/task.entity";
import EntityError from "@/domain/errors/entity-error";
import TaskRepository from "@/domain/repositories/task-repository";
import { Either, left, right } from "@/shared/either";
import { CreateTaskInput } from "@/shared/inputs/task/create-task-input";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(request: CreateTaskInput): Promise<Either<EntityError, Task>> {
    const task = new Task(request.title, request.color, request.columnId, request.description, request.labels);

    const error = task.validate();

    if (error) {
      return left(error);
    }
    
    const columnTasks = await this.taskRepository.findByColumnId(request.columnId);
    
    if (columnTasks.length === 0) {
      task.position = 0;
    } else {
      const highestPosition = Math.max(...columnTasks.map(t => t.position));
      task.position = highestPosition + 1;
    }

    const result = await this.taskRepository.save(task);

    return right(result);
  }
}
