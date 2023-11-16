import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class UpdateMasterDataForm {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;
    @ApiProperty()
    name: string;

    @ApiProperty()
    kind: string;
}