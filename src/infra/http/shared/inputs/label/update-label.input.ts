import { PartialType } from '@nestjs/mapped-types';
import { CreateLabelInput } from './create-label.input';

export class UpdateLabelInput extends PartialType(CreateLabelInput) {} 