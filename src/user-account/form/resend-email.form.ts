import { ApiProperty } from '@nestjs/swagger';

export class resendEmailForm {
    @ApiProperty()
    email: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    hostUI: string;
}
