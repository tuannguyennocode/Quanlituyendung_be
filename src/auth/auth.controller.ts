/* eslint-disable prettier/prettier */
import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.public.decorator';

import { LoginForm } from './form/login.form';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterForm } from './form/register.form';
import { RtGuard } from './guard';
import { LoginDto } from './dto/login.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: LoginDto,
    })
    @Post('login')
    signIn(@Body() loginForm: LoginForm) {
        return this.authService.signIn(loginForm);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: 201,
      description: 'OK',
  })
    @Post('register')
    signUp(@Body() registerForm: RegisterForm) {
        return this.authService.signUp(registerForm);
    }
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Request() req) {
        return await this.authService.logout(req.user.id);
    }
    // @Public()
    // @UseGuards(RtGuard)
    // @Post('/refresh-token')
    // @HttpCode(HttpStatus.OK)
    // async refreshTokens(
    //   @GetCurrentUser('refreshToken') refreshToken: string,
    //   @GetCurrentUserId() userId: string,
    // ) {
    //   return await this.authService.refreshTokens(userId, refreshToken);
    // }
}
