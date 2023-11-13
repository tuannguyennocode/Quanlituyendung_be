/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserAccountModule } from './user-account/user-account.module';
import { AuthModule } from './auth/auth.module';
import { JobPostingModule } from './jobposting/jobposting.module';
import { ErrorsFilter } from './response/errors/errors.filter';
import { APP_FILTER } from '@nestjs/core';
import { CompanyModule } from './company/company.module';
import { MasterDataModule } from './master-data/master-data.module';
import { MasterDataTypeModule } from './master-data-type/master-data-type.module';
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
        CompanyModule,
        MasterDataModule,
        MasterDataTypeModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ErrorsFilter,
        },
    ],
})
export class AppModule {}
