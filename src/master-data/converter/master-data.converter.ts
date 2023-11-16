import { Injectable } from '@nestjs/common';
import { MasterData } from '../master-data.schema';
import { MasterDataDto } from '../dto/master-data.dto';

@Injectable()
export class MasterDataConverter {
    static toDto(masterData: MasterData): MasterDataDto {
        const masterDataDto = new MasterDataDto();
        masterDataDto._id = masterData._id;
        masterDataDto.name = masterData.name;
        masterDataDto.kind = masterData.kind;
        return masterDataDto;
    }
}
