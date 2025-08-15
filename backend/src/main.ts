import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // サブスクリプションテスト用
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
}
bootstrap();
