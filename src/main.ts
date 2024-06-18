import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const { PORT, NODE_ENV } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe(
      {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }
    ));

  app.setGlobalPrefix('/api/v1/')

  const config = new DocumentBuilder()
    .setTitle('API DOCUMENTATION')
    .setDescription('The Feed Furry API description')
    .setVersion('1.0')
    .addTag('Pet Type')
    .addTag('Users')
    .addTag('Auth')
    .addTag('Breed')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/documentation', app, document);

  const port = PORT ?? 3000

  await app.listen(port, () => console.log(`listening on port ${port} in SERVER ${NODE_ENV}`));

}
bootstrap();
