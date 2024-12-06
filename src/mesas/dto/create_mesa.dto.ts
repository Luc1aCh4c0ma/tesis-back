import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateMesaDto {
    @IsNotEmpty()
    @IsNumber()
    numero: number;
  
    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
  }
  