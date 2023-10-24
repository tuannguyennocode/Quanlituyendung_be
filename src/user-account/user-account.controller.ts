/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { setSuccessResponse } from '../response/success';
import { UpdateProfileForm } from './form/update-profile.form';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserListDto } from './dto/user-list.dto';
@ApiTags('User')
@Controller('user')
export class UserAccountController {
    constructor(private readonly userAccountService: UserAccountService) {}

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: UserProfileDto,
    })
    @Get('profile')
    async getProfile(@Request() req) {
        const userAccount = await this.userAccountService.getProfile(req.user.id);
        return setSuccessResponse('Lấy tài khoản user thành công', userAccount);
    }
    @ApiBearerAuth()
    @ApiResponse({
        status: 201,
        description: 'OK'
    })
    @Put('profile')
    async updateProfile(@Request() req, @Body() updateProfileForm: UpdateProfileForm) {
        return await this.userAccountService.updateOne(req.user.id, updateProfileForm);
    }
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'OK',
        isArray: true,
        type: UserListDto,
    })
    @Get('list')
    async getListUserAccount() {
        const listUserAccount = await this.userAccountService.findAll();
        return setSuccessResponse('Lấy danh sách tài khoản user thành công', listUserAccount);
    }
}
