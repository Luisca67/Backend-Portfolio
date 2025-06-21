import { Expose, Type } from 'class-transformer';
import { TechnologyResponseDto } from '../technology/technology-response.dto';

export class ProjectResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  image_url: string;

  @Expose()
  github_url: string;

  @Expose()
  live_url: string;

  @Expose()
  is_active: boolean;

  @Expose()
  order: number;

  @Expose()
  @Type(() => TechnologyResponseDto)
  technologies: TechnologyResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<ProjectResponseDto>) {
    Object.assign(this, partial);
  }
}
