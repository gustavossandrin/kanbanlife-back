import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelInput } from '../../shared/inputs/label/create-label.input';
import { UpdateLabelInput } from '../../shared/inputs/label/update-label.input';

@Controller('labels')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() createLabelDto: CreateLabelInput) {
    return this.labelService.create(createLabelDto);
  }

  @Get('task/:taskId')
  findByTask(@Param('taskId') taskId: string) {
    return this.labelService.findByTaskId(taskId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelInput) {
    return this.labelService.update(id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelService.remove(id);
  }
} 