import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { MasterDataTypeDto } from 'src/master-data-type/dto/master-data-type.dto';
import { MasterData } from '../master-data.schema';

export class MasterDataDto {
    @ApiProperty()
    _id: mongoose.Types.ObjectId;

    @ApiProperty()
    name: string;

    @ApiProperty()
    kind: string;
    @ApiProperty({ type: [MasterDataTypeDto] })
    masterDataTypes: MasterData[];
}
