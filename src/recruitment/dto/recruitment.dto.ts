import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class RecruitmentDto {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    name: string;

    @ApiProperty()
    jobPostingId: mongoose.Types.ObjectId;

    @ApiProperty()
    userId: mongoose.Types.ObjectId;

    @ApiProperty()
    cv_url: string;

    @ApiProperty()
    letter: string;
}
