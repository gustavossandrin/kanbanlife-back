import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from '../../../../domain/repositories/task-repository';
import { Task } from '../../../../domain/entities/task.entity';
import { CreateTaskInput } from '../../shared/inputs/task/create-task.input';
import { UpdateTaskInput } from '../../shared/inputs/task/update-task.input';

@Injectable()
export class TaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = new Task();
    Object.assign(task, createTaskInput);
    return this.taskRepository.create(task);
  }

  async findByColumnId(columnId: string): Promise<Task[]> {
    return this.taskRepository.findByColumnId(columnId);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    return this.taskRepository.update(id, updateTaskInput);
  }

  async updatePosition(id: string, position: number): Promise<void> {
    return this.taskRepository.updatePosition(id, position);
  }

  async remove(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
} 