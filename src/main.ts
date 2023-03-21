import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/_app/app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
