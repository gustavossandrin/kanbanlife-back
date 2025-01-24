import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnInput } from './create-column.input';

export class UpdateColumnInput extends PartialType(CreateColumnInput) {} 