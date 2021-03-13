import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const port = process.env.API_PORT || 1337;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Server running on port ${port}`, 'Boostrap');
}
bootstrap();
