import { CreateTaskUseCase } from '@/app/usecases/task/create-task';
import { UpdateTaskUseCase } from '@/app/usecases/task/update-task';
import { UpdateTaskPositionUseCase } from '@/app/usecases/task/update-task-position';
import { DeleteTaskUseCase } from '@/app/usecases/task/delete-task';
import { CreateTaskInput } from '@/shared/inputs/task/create-task-input';
import { UpdateTaskInput } from '@/shared/inputs/task/update-task-input';
import { UpdateTaskPositionInput } from '@/shared/inputs/task/update-task-position-input';
import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Param,
  UnprocessableEntityException,
  NotFoundException,
  UseGuards,
  Patch
} from "@nestjs/common";
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly updateTaskPositionUseCase: UpdateTaskPositionUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTaskInput: CreateTaskInput) {
    const result = await this.createTaskUseCase.execute(createTaskInput);

    if (result.isLeft()) {
      throw new UnprocessableEntityException(result.value);
    }

    return result.value;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateTaskInput: UpdateTaskInput) {
    const result = await this.updateTaskUseCase.execute(id, updateTaskInput);

    if (result.isLeft()) {
      throw new UnprocessableEntityException(result.value);
    }

    return result.value;
  }

  @Put(':id/position')
  @UseGuards(JwtAuthGuard)
  async updatePosition(
    @Param('id') id: string,
    @Body() updateTaskPositionInput: UpdateTaskPositionInput,
  ) {
    const result = await this.updateTaskPositionUseCase.execute(
      id,
      updateTaskPositionInput,
    );

    if (result.isLeft()) {
      throw new UnprocessableEntityException(result.value);
    }

    return result.value;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    const result = await this.deleteTaskUseCase.execute(id);

    if (result.isLeft()) {
      throw new NotFoundException(result.value);
    }
  }
} 