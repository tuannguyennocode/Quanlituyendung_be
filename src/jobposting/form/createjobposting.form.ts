/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { IsDateFormat } from '../../validator/is-date-format.validator';
import { MasterData } from 'src/master-data/master-data.schema';
import { MasterDataType } from 'src/master-data-type/master-data-type.schema';

export class CreateJobPostingForm {
    @ApiProperty({ type: String })
    @IsNotEmpty({ message: 'companyId can not empty' })
    company: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'name can not empty' })
    name: string;

    @ApiProperty()
    skills: MasterDataType[];

    @ApiProperty()
    levels: MasterDataType[];

    @ApiProperty()
    job_types: MasterDataType[];

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
