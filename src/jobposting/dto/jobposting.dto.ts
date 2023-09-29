/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
export class JobPostingDto {
  @ApiProperty()
  _id: mongoose.Types.ObjectId;
  @ApiProperty()
  name: string;
  // Thêm trường startDate và endDate
  @ApiProperty()
  startDate: string; // Định dạng ngày bắt đầu

  @ApiProperty()
  endDate: string; // Định dạng ngày kết thúc

  // Thêm trường detail theo cấu trúc bạn đã mô tả
  @ApiProperty()
  detail: object;
}
