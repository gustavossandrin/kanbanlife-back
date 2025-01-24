import { IsString } from 'class-validator';

export class CreateLabelInput {
  @IsString({ message: 'O título deve ser uma string' })
  title: string;
} 