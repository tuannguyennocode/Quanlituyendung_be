/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UserAccountModule } from "./user-account/user-account.module";
import { AuthModule } from "./auth/auth.module";

import { ErrorsFilter } from "./response/errors/errors.filter";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI, { dbName: "quanlituyendung_db" }),
    UserAccountModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
    },
  ],
})
export class AppModule {}
