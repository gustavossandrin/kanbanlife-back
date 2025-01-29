import { Injectable, Inject } from '@nestjs/common';
import { ILabelRepository } from '../../../../domain/repositories/label-repository';
import { Label } from '../../../../domain/entities/label.entity';
import { CreateLabelInput } from '../../shared/inputs/label/create-label.input';
import { UpdateLabelInput } from '../../shared/inputs/label/update-label.input';

@Injectable()
export class LabelService {
  constructor(
    @Inject('ILabelRepository')
    private readonly labelRepository: ILabelRepository,
  ) {}

  async create(createLabelInput: CreateLabelInput): Promise<Label> {
    const label = new Label();
    Object.assign(label, createLabelInput);
    return this.labelRepository.create(label);
  }

  async findByTaskId(taskId: string): Promise<Label[]> {
    return this.labelRepository.findByTaskId(taskId);
  }

  async findOne(id: string): Promise<Label> {
    const label = await this.labelRepository.findById(id);
    if (!label) {
      throw new Error('Label not found');
    }
    return label;
  }

  async update(id: string, updateLabelInput: UpdateLabelInput): Promise<Label> {
    return this.labelRepository.update(id, updateLabelInput);
  }

  async remove(id: string): Promise<void> {
    return this.labelRepository.delete(id);
  }
} 