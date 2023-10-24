/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class CreateCompanyForm {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  company_size: string;

  @ApiProperty()
  web_url: string;

  @ApiProperty()
  description: string;
}
