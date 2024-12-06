import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        family: 4, // Fuerza IPv4
        debug: true, // Habilita logs detallados
        logger: true, // Habilita el logger
      });      
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Soporte" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
      });
      console.log('Correo enviado con éxito.');
    } catch (error) {
      console.error('Error enviando correo:', error);
      throw new Error('No se pudo enviar el correo.');
    }
  }
}