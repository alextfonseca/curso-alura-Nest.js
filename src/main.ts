import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('Api for creating users within our api')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swaggerAPI', app, document);

  // validation
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
