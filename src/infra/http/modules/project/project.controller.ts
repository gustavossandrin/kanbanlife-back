import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RequestWithUser } from '../../types/express';
import { CreateProjectDto } from './dtos/create-project.dto';
import { CreateProjectUseCase } from '@/app/usecases/project/create-project';
import { FindProjectsByUserUseCase } from '@/app/usecases/project/find-projects-by-user';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly findProjectsByUserUseCase: FindProjectsByUserUseCase
  ) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  findByUser(@Req() request: RequestWithUser) {
    return this.findProjectsByUserUseCase.execute({
      userId: request.user.userId
    });
  }

  @Post('new')
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() request: RequestWithUser,
  ) {
    return this.createProjectUseCase.execute({
      ...createProjectDto,
      userId: request.user.userId
    });
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