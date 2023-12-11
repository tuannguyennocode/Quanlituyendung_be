/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
export class UpdateCompanyForm {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty({ message: 'name can not empty' })
    name: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'name can not empty' })
    avatar_url: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'phoneNumber can not empty' })
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'email can not empty' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'address can not empty' })
    address: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'company_size can not empty' })
    company_size: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'web_url can not empty' })
    web_url: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'descripiton can not empty' })
    description: string;
}
