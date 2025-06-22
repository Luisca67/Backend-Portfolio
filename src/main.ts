import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para Vercel y localhost
  app.enableCors({
    origin: [
      'https://portfolio-luis-cabrera.vercel.app',
      'https://portfolio-luis-cabrera-b8acrinnt.vercel.app', // <-- AGREGA ESTE
      'http://localhost:3000',
    ],
    credentials: true,
  });

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true, // Transforma automáticamente los tipos
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
