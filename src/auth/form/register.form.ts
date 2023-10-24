import { ApiProperty } from '@nestjs/swagger';
export class RegisterForm {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
}
