import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEmail,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(10, { message: 'El comentario debe tener al menos 10 caracteres' })
  @MaxLength(1000, {
    message: 'El comentario no puede exceder 1000 caracteres',
  })
  content: string;

  @IsString()
  @MinLength(2, {
    message: 'El nombre del autor debe tener al menos 2 caracteres',
  })
  @MaxLength(100, {
    message: 'El nombre del autor no puede exceder 100 caracteres',
  })
  author_name: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email del autor debe ser válido' })
  @MaxLength(100, {
    message: 'El email del autor no puede exceder 100 caracteres',
  })
  author_email?: string;

  @IsOptional()
  @IsBoolean()
  is_approved?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'La calificación debe ser entre 1 y 5' })
  @Max(5, { message: 'La calificación debe ser entre 1 y 5' })
  rating?: number;

  @IsNumber()
  project_id: number;
}
