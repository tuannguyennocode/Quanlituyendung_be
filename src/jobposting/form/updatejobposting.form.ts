/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { IsNotEmpty, IsObject, IsDateString } from 'class-validator';
import { IsDateFormat } from '../../validator/is-date-format.validator';
import { MasterDataType } from 'src/master-data-type/master-data-type.schema';

export class UpdateJobPostingForm {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty({ message: 'name can not empty' })
    name: string;

    @ApiProperty()
    @IsDateFormat()
    startDate: string;

    @ApiProperty()
    @IsDateFormat()
    endDate: string;

    @ApiProperty()
    @IsObject({ message: 'must be Object' })
    detail: object;
    @ApiProperty()
    skills: MasterDataType[];

    @ApiProperty()
    levels: MasterDataType[];

    @ApiProperty()
    job_types: MasterDataType[];
}
