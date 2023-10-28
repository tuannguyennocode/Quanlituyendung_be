import { ApiProperty } from '@nestjs/swagger';

export class CompanyFilter {
    @ApiProperty({ required: false, type: Number })
    page?: number = 1;

    @ApiProperty({ required: false, type: Number })
    perPage?: number = 10;

    @ApiProperty({ required: false, type: String })
    phoneNumber?: string;
}
