import { IsString, IsNumber, IsUUID, IsEnum, MaxLength, IsOptional } from 'class-validator';
import { TaskColor } from '../../../../../domain/enums/task-color.enum';

export class CreateTaskInput {
  @IsString({ message: 'O título deve ser uma string' })
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres' })
  title: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  @IsOptional({ message: 'A descrição é opcional' })
  description?: string;

  @IsNumber({}, { message: 'A posição deve ser um número' })
  position: number;

  @IsEnum(TaskColor, { message: 'A cor deve ser uma das cores válidas' })
  color: TaskColor;

  @IsUUID('4', { message: 'O ID da coluna deve ser um UUID válido' })
  columnId: string;
} 