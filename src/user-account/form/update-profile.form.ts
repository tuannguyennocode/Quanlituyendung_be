/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfileForm {
  @ApiProperty()
  profile: Object;
  @ApiProperty()
  name: string;
}
