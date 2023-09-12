/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAccountController } from './user-account.controller';
import { UserAccountService } from './user-account.service';
import { UserAccountSchema } from './user-account.schema';

const USER_ACCOUNT_MODEL = MongooseModule.forFeature([
  { name: 'UserAccount', schema: UserAccountSchema },
]);
@Module({
  imports: [
    USER_ACCOUNT_MODEL,
  ],
  controllers: [UserAccountController],
  providers: [UserAccountService],
  exports: [
    UserAccountService,
    USER_ACCOUNT_MODEL,
  ],
})
export class UserAccountModule {}
