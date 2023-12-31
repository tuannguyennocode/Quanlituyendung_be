/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserAccountModule } from "../user-account/user-account.module";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AtStrategies, RtStrategies } from "./strategies";
import { AtGuard } from "./guard";

@Module({
  imports: [UserAccountModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategies,
    RtStrategies,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
