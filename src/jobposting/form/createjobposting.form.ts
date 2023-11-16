/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { IsDateFormat } from '../../validator/is-date-format.validator';

export class CreateJobPostingForm {
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
