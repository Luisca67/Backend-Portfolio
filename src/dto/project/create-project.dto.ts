import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
  MaxLength,
  IsUrl,
  Min,
  Max,
  IsArray,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
  @MaxLength(200, { message: 'El título no puede exceder 200 caracteres' })
  title: string;

  @IsString()
  @MinLength(10, {
    message: 'La descripción debe tener al menos 10 caracteres',
  })
  @MaxLength(2000, {
    message: 'La descripción no puede exceder 2000 caracteres',
  })
  description: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  @MaxLength(500, {
    message: 'La URL de la imagen no puede exceder 500 caracteres',
  })
  image_url?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'La URL de GitHub debe ser válida' })
  @MaxLength(500, {
    message: 'La URL de GitHub no puede exceder 500 caracteres',
  })
  github_url?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'La URL en vivo debe ser válida' })
  @MaxLength(500, { message: 'La URL en vivo no puede exceder 500 caracteres' })
  live_url?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'El orden debe ser mayor o igual a 0' })
  order?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  technology_ids?: number[];
}
