import { Expose } from 'class-transformer';

export class TechnologyResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  icon: string;

  @Expose()
  is_active: boolean;

  @Expose()
  category: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<TechnologyResponseDto>) {
    Object.assign(this, partial);
  }
}
