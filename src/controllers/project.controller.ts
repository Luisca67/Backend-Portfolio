import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectResponseDto,
} from '../dto/project';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectService.findAll();
    return projects.map((project) => new ProjectResponseDto(project));
  }

  @Get('active')
  async findActive(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectService.findActive();
    return projects.map((project) => new ProjectResponseDto(project));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectResponseDto | null> {
    const project = await this.projectService.findOne(id);
    return project ? new ProjectResponseDto(project) : null;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectResponseDto> {
    const project = await this.projectService.create(createProjectDto);
    return new ProjectResponseDto(project);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponseDto | null> {
    const project = await this.projectService.update(id, updateProjectDto);
    return project ? new ProjectResponseDto(project) : null;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectService.delete(id);
  }
}
