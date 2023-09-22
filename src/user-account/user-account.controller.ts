/* eslint-disable prettier/prettier */
import { Controller, Get, Request } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserAccountController {
  constructor(private readonly userService: UserAccountService) {}
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.username);
  }
}
