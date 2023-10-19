/* eslint-disable prettier/prettier */
import { Controller, Get, Request } from "@nestjs/common";
import { UserAccountService } from "./user-account.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { setSuccessResponse } from "../response/success";
@ApiTags("User")
@Controller("user")
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @ApiBearerAuth()
  @Get("profile")
  async getProfile(@Request() req) {
    const userAccount = await this.userAccountService.findById(req.user.id);
    return setSuccessResponse("Lấy tài khoản user thành công", userAccount);
  }
  @ApiBearerAuth()
  @Get()
  async getListUserAccount() {
    const listUserAccount = await this.userAccountService.findAll();
    return setSuccessResponse("Lấy danh sách tài khoản user thành công", listUserAccount);
  }
}
