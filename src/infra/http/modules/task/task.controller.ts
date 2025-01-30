import { Controller} from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor() {}

//   @Post()
//   create(@Body() createTaskDto: CreateTaskInput) {
//     return this.taskService.create(createTaskDto);
//   }

//   @Get('column/:columnId')
//   findByColumn(@Param('columnId') columnId: string) {
//     return this.taskService.findByColumnId(columnId);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.taskService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskInput) {
//     return this.taskService.update(id, updateTaskDto);
//   }

//   @Put(':id/position')
//   updatePosition(@Param('id') id: string, @Body('position') position: number) {
//     return this.taskService.updatePosition(id, position);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.taskService.remove(id);
//   }
} 