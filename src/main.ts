import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as CookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './HttpException/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(CookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // hanya properti yang telah didefinisikan dalam DTO (Data Transfer Object) yang akan diterima dari data yand dimasukan.
    }),
  );
  await app.listen(5000);
}

bootstrap();
