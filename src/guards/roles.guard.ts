import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token);

      // Consultar el usuario en la base de datos
      const user = await this.userRepository.findOne({ where: { id: decoded.id } });
      if (!user || user.role !== decoded.role) {
        return false; // Rol no coincide o usuario no existe
      }

      // Verificar rol permitido
      const requiredRoles: string[] = this.getRolesFromMetadata(context);
      return requiredRoles.includes(user.role);
    } catch (e) {
      return false;
    }
  }

  private getRolesFromMetadata(context: ExecutionContext): string[] {
    const roles = Reflect.getMetadata('roles', context.getHandler()) || [];
    return roles;
  }
}
