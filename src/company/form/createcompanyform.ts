/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateCompanyForm {
    @ApiProperty()
    name: string;

    @ApiProperty()
    avatar_url: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    company_size: string;

    @ApiProperty()
    web_url: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    review: string;
}
