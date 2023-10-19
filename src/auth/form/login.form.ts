/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class LoginForm {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
