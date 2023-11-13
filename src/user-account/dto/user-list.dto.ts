/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class UserListDto {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    email: string;
    @ApiProperty()
    profile: Object;
    @ApiProperty()
    role: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    status: string;
}
