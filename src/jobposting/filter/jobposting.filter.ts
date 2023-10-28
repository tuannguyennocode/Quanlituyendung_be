import { ApiProperty } from '@nestjs/swagger';

export class JobPostingFilter {
    @ApiProperty({ required: false, type: Number })
    page?: number = 1;

    @ApiProperty({ required: false, type: Number })
    perPage?: number = 10;
}
