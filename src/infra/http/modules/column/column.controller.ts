import { Controller} from '@nestjs/common';

@Controller('columns')
export class ColumnController {
  constructor() {}

  // @Post()
  // create(@Body() createColumnDto: CreateColumnInput) {
  //   return this.columnService.create(createColumnDto);
  // }

  // @Get('project/:projectId')
  // findByProject(@Param('projectId') projectId: string) {
  //   return this.columnService.findByProjectId(projectId);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.columnService.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnInput) {
  //   return this.columnService.update(id, updateColumnDto);
  // }

  // @Put(':id/position')
  // updatePosition(@Param('id') id: string, @Body('position') position: number) {
  //   return this.columnService.updatePosition(id, position);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.columnService.remove(id);
  // }
} 