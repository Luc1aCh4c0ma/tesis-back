import { IsString, IsNotEmpty } from 'class-validator';

export class CrearCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
