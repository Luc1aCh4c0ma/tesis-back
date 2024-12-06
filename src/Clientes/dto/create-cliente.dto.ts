import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  metodoPago: string;

  @IsOptional()
  @IsNumber()
  mesaId?: number; // La mesa es opcional
}
