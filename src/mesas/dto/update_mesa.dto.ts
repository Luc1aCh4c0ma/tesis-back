import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMesaDto {
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}