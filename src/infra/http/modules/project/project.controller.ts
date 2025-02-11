import { Controller, Get, UseGuards, Req, Post, Body, Param, NotFoundException, Delete } from "@nestjs/common";
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RequestWithUser } from '../../types/express';
import { CreateProjectDto } from './dtos/create-project.dto';
import { CreateProjectUseCase } from '@/app/usecases/project/create-project';
import { FindProjectsByUserUseCase } from '@/app/usecases/project/find-projects-by-user';
import { FindProjectByIdUseCase } from '@/app/usecases/project/find-by-id';
import { DeleteProjectUseCase } from "@/app/usecases/project/delete-project";

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly findProjectsByUserUseCase: FindProjectsByUserUseCase,
    private readonly findProjectByIdUseCase: FindProjectByIdUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
  ) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  findByUser(@Req() request: RequestWithUser) {
    return this.findProjectsByUserUseCase.execute({
      userId: request.user.userId,
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
      userId: request.user.userId,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string, @Req() request: RequestWithUser) {
    const project = await this.findProjectByIdUseCase.execute(
      id,
      request.user.userId,
    );

    if (project.isLeft()) {
      throw new NotFoundException(project.value);
    }

    return project.value;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const project = await this.deleteProjectUseCase.execute(
      id,
      request.user.userId,
    );

    if (project.isLeft()) {
      throw new NotFoundException(project.value);
    }

    return;
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectInput) {
  //   return this.projectService.update(id, updateProjectDto);
  // }

  // @Post()
  // create(@Body() createProjectDto: CreateProjectInput) {
  //   return this.projectService.create(createProjectDto);
  // }
}
