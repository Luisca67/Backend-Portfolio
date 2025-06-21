import {
  IsString,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
  IsIn,
} from 'class-validator';

export class CreateTechnologyDto {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, {
    message: 'La descripción no puede exceder 1000 caracteres',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'La URL del icono no puede exceder 255 caracteres',
  })
  icon?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['frontend', 'backend', 'database', 'devops', 'mobile', 'other'], {
    message:
      'La categoría debe ser: frontend, backend, database, devops, mobile u other',
  })
  category?: string;
}
