/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserAccountModule } from './user-account/user-account.module';
import { AuthModule } from './auth/auth.module';
import { JobPostingModule } from './jobposting/jobposting.module';
import { ErrorsFilter } from './response/errors/errors.filter';
import { APP_FILTER } from '@nestjs/core';
import { CompanyModule } from './company/company.module';
import { AuditableMiddleware } from './auditable/auditable.middleware';
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
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ErrorsFilter,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuditableMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.POST, // Áp dụng cho tất cả các phương thức (GET, POST, PUT, DELETE, vv.)
        });
        consumer.apply(AuditableMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.PUT, // Áp dụng cho tất cả các phương thức (GET, POST, PUT, DELETE, vv.)
        });
        consumer.apply(AuditableMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.DELETE, // Áp dụng cho tất cả các phương thức (GET, POST, PUT, DELETE, vv.)
        });
    }
}
