/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class LoginForm {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
