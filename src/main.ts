/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from 'src/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  SwaggerModule.setup('api', app, createDocument(app), {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  // const config = new DocumentBuilder()
  //   .setTitle('Quan ly tuyen dung')
  //   .setDescription('Quan ly tuyen dung API description')
  //   .setVersion('1.0')
  //   .addTag('Quan ly tuyen dung')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: 'http://localhost:3000', // Thay đổi thành tên miền hoặc URL của máy chủ gốc của bạn
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Cho phép truy cập có danh tính (đối với các cookie hoặc chứng thực)
  });
  await app.listen(5000);
}
bootstrap();
