/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const isNameUnique = await this.userService.isNameUnique(createUserDto.walletAddress);
        if (!isNameUnique) {
            throw new HttpException('User existed', HttpStatus.OK);
        } else {
            return this.userService.createUser(createUserDto);
        }
    }
}
