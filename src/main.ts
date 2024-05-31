import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as CookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './Infrastructure/Exceptions/HttpException/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser());
  app.enableCors({
    origin: 'http://localhost:9100',
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // hanya properti yang telah didefinisikan dalam DTO (Data Transfer Object) yang akan diterima dari data yang dimasukan.
    }),
  );
  await app.listen(5000);
}

bootstrap();
