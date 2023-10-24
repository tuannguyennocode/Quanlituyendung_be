/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
export class UpdateCompanyForm {
  @ApiProperty()
  _id: mongoose.Types.ObjectId;
  
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
