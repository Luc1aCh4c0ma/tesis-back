import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async register(email: string, password: string, name: string, acceptedTerms: boolean, role: string ) {
    if (!acceptedTerms) {
      throw new BadRequestException('Debes aceptar los términos y condiciones');
    }
  
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword, name, acceptedTerms, role });
    return this.userRepository.save(user);
  }
  

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Credenciales inválidas');
    }
  
    const payload = { id: user.id, role: user.role };
    const token = this.jwtService.sign(payload); // Incluir rol en el token
    return { token };
  }
  
  
  async generateRecovery(email: string) {
    // Verifica si el usuario existe
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    // Genera un token de recuperación
    const recoveryToken = this.jwtService.sign({ id: user.id }, { expiresIn: '15m' });

    // Construye el enlace de recuperación
    const recoveryLink = `http://localhost:3000/reset?token=${recoveryToken}`;

    // Enviar correo electrónico
    const subject = 'Recupera tu contraseña';
    const html = `
      <p>Hola,</p>
      <p>Has solicitado recuperar tu contraseña. Haz clic en el enlace para continuar:</p>
      <a href="${recoveryLink}">Recuperar Contraseña</a>
      <p>Si no solicitaste esta acción, puedes ignorar este correo.</p>
    `;
    await this.mailService.sendMail(email, subject, html);

    return { message: 'Correo de recuperación enviado' };
  }
  
  
  async resetPassword(recoveryToken: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(recoveryToken); // Decodifica y verifica el token
      const user = await this.userRepository.findOne({ where: { id: payload.id } });
      if (!user) throw new BadRequestException('Token inválido o usuario no encontrado');
  
      user.password = await bcrypt.hash(newPassword, 10); // Hashear la nueva contraseña
      return this.userRepository.save(user); // Guardar la nueva contraseña
    } catch (error) {
      throw new BadRequestException('Token inválido o expirado');
    }
  }
  
  
}
