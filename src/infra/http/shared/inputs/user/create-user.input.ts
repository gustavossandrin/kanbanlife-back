import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserInput {
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  firstName: string;

  @IsString({ message: 'O sobrenome deve ser uma string' })
  @MinLength(2, { message: 'O sobrenome deve ter no mínimo 2 caracteres' })
  lastName: string;

  @IsString({ message: 'A foto deve ser uma string' })
  photo?: string;
} 