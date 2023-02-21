import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma os dados para o tipo definido no DTO
      whitelist: true, // remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // retorna um erro se uma propriedade não estiver no DTO
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // para que o class-validator use o container do NestJS
  await app.listen(3000);
}
bootstrap();
