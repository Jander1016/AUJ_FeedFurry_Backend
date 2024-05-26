import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import internal from 'stream';

const {PORT, NODE_ENV}= process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = PORT ?? 3000
  await app.listen(port, ()=> console.log(`listening on port ${port} in SERVER ${NODE_ENV}`));
}
bootstrap();
