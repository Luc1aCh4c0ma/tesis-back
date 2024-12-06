import { IsString, IsOptional } from 'class-validator';

export class CrearProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsOptional()
  precio: number;

  @IsOptional()
  disponible?: boolean;

  @IsOptional()
  categoriaId: number;

  @IsString()
  @IsOptional()
  imagen?: string | null; // Ahora acepta `null` como valor válido
}
