import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnInput } from '../../shared/inputs/column/create-column.input';
import { UpdateColumnInput } from '../../shared/inputs/column/update-column.input';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnInput) {
    return this.columnService.create(createColumnDto);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.columnService.findByProjectId(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnInput) {
    return this.columnService.update(id, updateColumnDto);
  }

  @Put(':id/position')
  updatePosition(@Param('id') id: string, @Body('position') position: number) {
    return this.columnService.updatePosition(id, position);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.remove(id);
  }
} 