import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Technology } from '../entities/technology.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['technologies'],
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['technologies', 'comments'],
    });
  }

  async findActive(): Promise<Project[]> {
    return this.projectRepository.find({
      where: { is_active: true },
      relations: ['technologies'],
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { technology_ids, ...projectData } = createProjectDto;

    const project = this.projectRepository.create(projectData);

    if (technology_ids && technology_ids.length > 0) {
      const technologies =
        await this.technologyRepository.findByIds(technology_ids);
      project.technologies = technologies;
    }

    return this.projectRepository.save(project);
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    const { technology_ids, ...projectData } = updateProjectDto;

    if (technology_ids && technology_ids.length > 0) {
      const technologies =
        await this.technologyRepository.findByIds(technology_ids);
      project.technologies = technologies;
    }

    await this.projectRepository.update(id, projectData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    await this.projectRepository.delete(id);
  }
}
