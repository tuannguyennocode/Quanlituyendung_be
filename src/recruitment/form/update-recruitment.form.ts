import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { StateRecruitment } from '../enum/state.enum';

export class UpdateRecruitmentForm {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    name: string;

    @ApiProperty()
    companyId: mongoose.Types.ObjectId;

    @ApiProperty()
    jobPostingId: mongoose.Types.ObjectId;

    @ApiProperty()
    userId: mongoose.Types.ObjectId;

    @ApiProperty()
    cv_url: string;

    @ApiProperty()
    letter: string;

    @ApiProperty()
    state: StateRecruitment;
}
