import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from './auth/guard/auth.guard';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { RefreshToken } from 'database/entities/refresh-token.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const refreshTokenRepository = app.get(getRepositoryToken(RefreshToken));
  const prefix = process.env.PREFIX;
  app.setGlobalPrefix(prefix); // Thiết lập tiền tố toàn cục cho các route
  app.useGlobalGuards(
    new JwtAuthGuard(reflector, jwtService, refreshTokenRepository),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'https://netflix-clone-fe-navy.vercel.app', // Cho phép từ Next.js
    credentials: true, // Nếu dùng cookies hay headers đặc biệt
  });
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
