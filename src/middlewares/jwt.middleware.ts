import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtenemos el token del header

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
      // Verificar el token
      const decoded = this.jwtService.verify(token);

      // Consultar al usuario desde la base de datos
      const user = await this.userRepository.findOne({ where: { id: decoded.id } });
      if (!user || user.role !== decoded.role) {
        return res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
      }

      // Pasar el usuario al request
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }
}
