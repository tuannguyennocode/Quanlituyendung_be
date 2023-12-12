import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateMasterDataTypeForm {
    @ApiProperty()
    @IsNotEmpty({ message: 'name can not empty' })
    name: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'masterData can not empty' })
    masterData: mongoose.Types.ObjectId;
}