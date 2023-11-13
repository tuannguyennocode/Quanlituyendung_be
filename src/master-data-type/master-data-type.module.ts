import { Module, forwardRef } from '@nestjs/common';
import { MasterDataTypeService } from './master-data-type.service';
import { MasterDataTypeController } from './master-data-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterDataTypeSchema } from './master-data-type.schema';
import { MasterDataModule } from 'src/master-data/master-data.module';

const MASTER_DATA_TYPE_MODEL = MongooseModule.forFeature([{ name: 'MasterDataType', schema: MasterDataTypeSchema }]);
@Module({
    imports: [MASTER_DATA_TYPE_MODEL,forwardRef(() => MasterDataModule)],
    controllers: [MasterDataTypeController],
    providers: [MasterDataTypeService],
    exports: [MasterDataTypeService, MASTER_DATA_TYPE_MODEL],
})
export class MasterDataTypeModule {}
