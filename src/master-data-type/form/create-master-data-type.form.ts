import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMasterDataTypeForm {
    @ApiProperty()
    @IsNotEmpty({ message: 'name can not empty' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'kind can not empty' })
    parentKind: string;
}