import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from '../entities/technology.entity';
import { CreateTechnologyDto, UpdateTechnologyDto } from '../dto/technology';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  async findAll(): Promise<Technology[]> {
    return this.technologyRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Technology | null> {
    return this.technologyRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
  }

  async findByCategory(category: string): Promise<Technology[]> {
    return this.technologyRepository.find({
      where: { category, is_active: true },
      order: { name: 'ASC' },
    });
  }

  async create(createTechnologyDto: CreateTechnologyDto): Promise<Technology> {
    const technology = this.technologyRepository.create(createTechnologyDto);
    return this.technologyRepository.save(technology);
  }

  async update(
    id: number,
    updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<Technology | null> {
    const technology = await this.findOne(id);
    if (!technology) {
      throw new NotFoundException(`Tecnología con ID ${id} no encontrada`);
    }

    await this.technologyRepository.update(id, updateTechnologyDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const technology = await this.findOne(id);
    if (!technology) {
      throw new NotFoundException(`Tecnología con ID ${id} no encontrada`);
    }

    await this.technologyRepository.delete(id);
  }
}
