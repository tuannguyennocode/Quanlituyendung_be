import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class MasterDataTypeDto {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    name: string;
    
    @ApiProperty()
    parentKind: string;
}