import { Injectable } from '@nestjs/common';
import { MasterDataType } from '../master-data-type.schema';
import { MasterDataTypeDto } from '../dto/master-data-type.dto';

@Injectable()
export class MasterDataTypeConverter {
    static toDto(masterDataType: MasterDataTypeDto): MasterDataTypeDto {
        const masterDataTypeDto = new MasterDataTypeDto();
        masterDataTypeDto._id = masterDataType._id;
        masterDataTypeDto.name = masterDataType.name;
        masterDataTypeDto.parentKind = masterDataType.parentKind;
        return masterDataTypeDto;
    }
}
