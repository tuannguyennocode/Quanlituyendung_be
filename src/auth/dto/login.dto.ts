import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
  @ApiProperty()
  tokenType: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  status: string;
}