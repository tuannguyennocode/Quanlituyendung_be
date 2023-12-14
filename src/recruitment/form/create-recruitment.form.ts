import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRecruitmentForm {
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
