import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class ActualizarProductoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  precio?: number;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;

  @IsString()
  @IsOptional()
  imagen?: string | null;
}
