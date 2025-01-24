import { IsNotEmpty } from 'class-validator';

export class RegisterInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
