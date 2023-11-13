/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from '../common/commonSchemaProps';
import { MasterDataType } from 'src/master-data-type/master-data-type.schema';

export type MasterDataDocument = HydratedDocument<MasterData>;

@Schema()
export class MasterData extends CommonSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    kind: string;
    
    @Prop({ ref: 'MasterDataType' })
    masterDataTypes: MasterDataType[];
}

export const MasterDataSchema = SchemaFactory.createForClass(MasterData);
