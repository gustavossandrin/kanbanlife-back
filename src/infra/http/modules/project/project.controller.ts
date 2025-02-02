import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ProjectService } from '@/app/services/project.service';
import { RequestWithUser } from '../../types/express';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  findByUser(@Req() request: RequestWithUser) {
    return this.projectService.findByUserId(request.user.userId);
  }

  // @Post()
  // create(@Body() createProjectDto: CreateProjectInput) {
  //   return this.projectService.create(createProjectDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectService.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectInput) {
  //   return this.projectService.update(id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectService.remove(id);
  // }
} 