/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { JobPostingDto } from 'src/jobposting/dto/jobposting.dto';
export class CompanyDto {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    name: string;

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

    @ApiProperty({ type: [JobPostingDto] }) // Sử dụng "type" để chỉ định kiểu dữ liệu của mảng
    jobPostings: JobPostingDto[];
}
