import { NestFactory } from '@nestjs/core';  
import { AppModule } from './app.module';  
import path, { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use('/assets', express.static(join(__dirname, '..', 'assets')));


  // Habilitar CORS
  app.enableCors({
    origin: ['https://cafeteriasosneado.vercel.app'], // Asegúrate de que este es el puerto correcto de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization', // Cabeceras que se permiten
  });
  
  // Servir archivos estáticos (imágenes, etc.)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Prefijo para acceder a las imágenes (http://localhost:3000/uploads/<archivo>)
  });

  await app.listen(3000);
}
bootstrap();