/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from '../common/commonSchemaProps';
import { JobPosting } from 'src/jobposting/jobposting.schema';

export type MasterDataTypeDocument = HydratedDocument<MasterDataType>;

@Schema()
export class MasterDataType extends CommonSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop()
    name: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'MasterData' })
    masterData: mongoose.Types.ObjectId;

    @Prop({ ref: 'JobPosting' })
    jobPosting: JobPosting[];
}

export const MasterDataTypeSchema = SchemaFactory.createForClass(MasterDataType);
