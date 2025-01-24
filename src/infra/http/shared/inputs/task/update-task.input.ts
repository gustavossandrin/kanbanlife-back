import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskInput } from './create-task.input';

export class UpdateTaskInput extends PartialType(CreateTaskInput) {} 