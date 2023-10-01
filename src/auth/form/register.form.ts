/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class RegisterForm {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
}
