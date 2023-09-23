/* eslint-disable prettier/prettier */

import { AppModule } from './app.module';

import { createDocument } from 'swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.enableCors({
    origin: 'http://localhost:3000', // Thay đổi thành tên miền hoặc URL của máy chủ gốc của bạn
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Cho phép truy cập có danh tính (đối với các cookie hoặc chứng thực)
  });
  await app.listen(5000);
}
bootstrap();
