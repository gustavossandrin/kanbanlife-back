import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from 'class-validator';
import { TaskColor } from '../../../../../domain/enums/task-color.enum';

export class CreateTaskInput {
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título não pode estar vazio' })
  @Length(1, 100, { message: 'O título deve ter entre 1 e 100 caracteres' })
  title: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsOptional()
  @Length(0, 500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  description?: string;

  @IsNumber({}, { message: 'A posição deve ser um número' })
  @Min(0, { message: 'A posição deve ser maior ou igual a 0' })
  position: number;

  @IsEnum(TaskColor, { message: 'Cor inválida' })
  color: TaskColor;

  @IsUUID('4', { message: 'O ID da coluna deve ser um UUID válido' })
  columnId: string;
} 