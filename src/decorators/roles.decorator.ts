import { SetMetadata } from '@nestjs/common';

/**
 * Define los roles permitidos para una ruta o método.
 * @param roles Lista de roles permitidos (ejemplo: 'admin', 'socio').
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
