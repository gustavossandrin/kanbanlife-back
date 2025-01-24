import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectInput } from '../../shared/inputs/project/create-project.input';
import { UpdateProjectInput } from '../../shared/inputs/project/update-project.input';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectInput) {
    return this.projectService.create(createProjectDto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.projectService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectInput) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
} 