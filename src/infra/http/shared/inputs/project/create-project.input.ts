import { IsString, IsUUID } from 'class-validator';

export class CreateProjectInput {
  @IsString()
  name: string;

  @IsUUID()
  userId: string;
} 