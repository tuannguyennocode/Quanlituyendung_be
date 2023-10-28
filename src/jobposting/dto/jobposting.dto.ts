/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
export class JobPostingDto {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;
    @ApiProperty()
    name: string;

    @ApiProperty()
    startDate: string;

    @ApiProperty()
    endDate: string;

    @ApiProperty()
    detail: object;
}
