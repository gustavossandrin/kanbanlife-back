import { IsString, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateColumnInput {
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNumber({}, { message: 'O número máximo de tarefas deve ser um número' })
  @Min(0, { message: 'O número máximo de tarefas deve ser maior ou igual a 0' })
  maxTasks: number;

  @IsNumber({}, { message: 'A posição deve ser um número' })
  @Min(0, { message: 'A posição deve ser maior ou igual a 0' })
  position: number;

  @IsNumber({}, { message: 'O código deve ser um número' })
  code: number;

  @IsUUID('4', { message: 'O ID do projeto deve ser um UUID válido' })
  projectId: string;
} 