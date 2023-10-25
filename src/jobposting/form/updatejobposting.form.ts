/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { IsNotEmpty, IsObject, IsDateString } from 'class-validator';
import { IsDateFormat } from 'src/validator/is-date-format.validator';

export class UpdateJobPostingForm {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;

    @ApiProperty({ type: String })
    @IsNotEmpty({ message: 'companyId can not empty' })
    companyId: string;

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
}
