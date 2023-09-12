/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.public.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto){
    return this.authService.signUp(createUserDto);
  }
}

