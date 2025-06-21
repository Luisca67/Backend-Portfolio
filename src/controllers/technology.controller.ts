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
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TechnologyService } from '../services/technology.service';
import {
  CreateTechnologyDto,
  UpdateTechnologyDto,
  TechnologyResponseDto,
} from '../dto/technology';

@Controller('technologies')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
  ): Promise<TechnologyResponseDto[]> {
    const technologies = category
      ? await this.technologyService.findByCategory(category)
      : await this.technologyService.findAll();

    return technologies.map((tech) => new TechnologyResponseDto(tech));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TechnologyResponseDto> {
    const technology = await this.technologyService.findOne(id);
    if (!technology) {
      throw new Error('Technology not found');
    }
    return new TechnologyResponseDto(technology);
  }

  @Get(':id/icon')
  async getIcon(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    const technology = await this.technologyService.findOne(id);
    if (!technology) {
      res.status(404).json({ message: 'Technology not found' });
      return;
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache por 1 año
    res.send(technology.icon);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTechnologyDto: CreateTechnologyDto,
  ): Promise<TechnologyResponseDto> {
    const technology = await this.technologyService.create(createTechnologyDto);
    return new TechnologyResponseDto(technology);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<TechnologyResponseDto> {
    const technology = await this.technologyService.update(
      id,
      updateTechnologyDto,
    );
    if (!technology) {
      throw new Error('Technology not found');
    }
    return new TechnologyResponseDto(technology);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.technologyService.delete(id);
  }
}
