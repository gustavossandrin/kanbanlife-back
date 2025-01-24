import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from '../../../../domain/repositories/task-repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../../../../domain/entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    Object.assign(task, createTaskDto);
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

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async updatePosition(id: string, position: number): Promise<void> {
    return this.taskRepository.updatePosition(id, position);
  }

  async remove(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
} 