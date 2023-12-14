import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user-account/enum/role.enum';
export class RegisterForm {
    @ApiProperty()
    name: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    hostUI: string;
    @ApiProperty()
    role: Role;
}
