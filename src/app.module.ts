/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserAccountModule } from './user-account/user-account.module';
import { AuthModule } from './auth/auth.module';
import { JobPostingModule } from './jobposting/jobposting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI, { dbName: 'quanlituyendung_db' }),
    UserAccountModule,
    AuthModule,
    JobPostingModule,
  ],
})
export class AppModule {}
