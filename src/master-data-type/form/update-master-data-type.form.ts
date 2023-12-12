import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class UpdateMasterDataTypeForm {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;
    @ApiProperty()
    name: string;
      
    @ApiProperty()
    masterData: mongoose.Types.ObjectId;
}