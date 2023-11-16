/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from '../common/commonSchemaProps';

export type MasterDataTypeDocument = HydratedDocument<MasterDataType>;

@Schema()
export class MasterDataType extends CommonSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop()
    name: string;
    @Prop({ref: 'MasterData',})
    parentKind: string;
}

export const MasterDataTypeSchema = SchemaFactory.createForClass(MasterDataType);
