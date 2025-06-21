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
  @MaxLength(10000, {
    message: 'El contenido del icono no puede exceder 10000 caracteres',
  })
  icon?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(
    ['Frontend', 'Backend', 'Database', 'Tools', 'DevOps', 'Mobile', 'Other'],
    {
      message:
        'La categoría debe ser: Frontend, Backend, Database, Tools, DevOps, Mobile u Other',
    },
  )
  category?: string;
}
