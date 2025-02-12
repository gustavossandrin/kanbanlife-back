import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class updateProjectColumnInput {
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  maxTasks?: number;

  @IsNumber()
  @Min(0)
  position: number;
}


export class UpdateProjectInput {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  columns: updateProjectColumnInput[];
}