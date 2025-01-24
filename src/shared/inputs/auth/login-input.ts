import { IsNotEmpty } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
