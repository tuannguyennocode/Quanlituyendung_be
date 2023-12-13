/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { MasterDataType } from 'src/master-data-type/master-data-type.schema';
import { RecruitmentDto } from 'src/recruitment/dto/recruitment.dto';
export class JobPostingDto {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;
    @ApiProperty()
    name: string;
    @ApiProperty()
    company: mongoose.Types.ObjectId;

    @ApiProperty()
    startDate: string;

    @ApiProperty()
    endDate: string;

    @ApiProperty()
    detail: object;
    @ApiProperty()
    skills: MasterDataType[];

    @ApiProperty()
    levels: MasterDataType[];
    
    @ApiProperty()
    job_types: MasterDataType[];
    
    @ApiProperty({ type: [RecruitmentDto] }) // Sử dụng "type" để chỉ định kiểu dữ liệu của mảng
    recruitment: RecruitmentDto[];
}
