import { Injectable, Inject } from '@nestjs/common';
import { ILabelRepository } from '../../../../domain/repositories/label-repository';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from '../../../../domain/entities/label.entity';

@Injectable()
export class LabelService {
  constructor(
    @Inject('ILabelRepository')
    private readonly labelRepository: ILabelRepository,
  ) {}

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    const label = new Label();
    Object.assign(label, createLabelDto);
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

  async update(id: string, updateLabelDto: UpdateLabelDto): Promise<Label> {
    return this.labelRepository.update(id, updateLabelDto);
  }

  async remove(id: string): Promise<void> {
    return this.labelRepository.delete(id);
  }
} 