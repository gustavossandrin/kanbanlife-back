import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class CreateUserInput {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @Length(2, 100, { message: 'O nome deve ter entre 2 e 100 caracteres' })
  firstName: string;

  @IsString({ message: 'O sobrenome deve ser uma string' })
  @Length(2, 100, { message: 'O sobrenome deve ter entre 2 e 100 caracteres' })
  lastName: string;

  @IsString({ message: 'A foto deve ser uma string' })
  @IsOptional()
  photo?: string;
} 