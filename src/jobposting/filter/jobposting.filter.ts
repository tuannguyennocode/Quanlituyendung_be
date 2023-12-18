import { ApiProperty } from '@nestjs/swagger';

export class JobPostingFilter {
    @ApiProperty({ required: false, type: Number })
    page?: number = 1;

    @ApiProperty({ required: false, type: Number })
    perPage?: number = 10;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    skills?: string;

    @ApiProperty({ required: false})
    jobTypes?: string;

    @ApiProperty({ required: false })
    levels?: string;
}
