import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateColumnInput {
  @IsOptional()
  @IsString({ message: 'O nome é obrigatório' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'O número máximo de tarefas deve ser um número' })
  @Min(1, { message: 'O número máximo de tarefas deve ser maior que 0' })
  maxTasks?: number;

  @IsOptional()
  @IsNumber({}, { message: 'A posição deve ser um número' })
  @Min(0, { message: 'A posição deve ser maior ou igual a 0' })
  position?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O código deve ser um número' })
  @Min(0, { message: 'O código deve ser maior ou igual a 0' })
  code?: number;
} 