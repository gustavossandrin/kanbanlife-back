import { IsString, IsArray, ValidateNested, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateColumnDto {
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

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateColumnDto)
  columns: CreateColumnDto[];
} 