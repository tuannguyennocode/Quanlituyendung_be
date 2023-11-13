import { Module } from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { MasterDataController } from './master-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterDataSchema } from './master-data.schema';
import { MasterDataTypeModule } from 'src/master-data-type/master-data-type.module';

const MASTER_DATA_MODEL = MongooseModule.forFeature([{ name: 'MasterData', schema: MasterDataSchema }]);
@Module({
    imports: [MASTER_DATA_MODEL,MasterDataTypeModule],
    controllers: [MasterDataController],
    providers: [MasterDataService],
    exports: [MasterDataService, MASTER_DATA_MODEL],
})
export class MasterDataModule {}
