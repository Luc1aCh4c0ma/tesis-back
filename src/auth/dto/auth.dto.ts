import { IsString, IsEmail, IsBoolean, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsBoolean()
  acceptedTerms: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['socio', 'admin'], { message: 'El rol debe ser "socio" o "admin"' })
  role?: string; // El rol puede ser opcional y tendrá un valor predeterminado
}
