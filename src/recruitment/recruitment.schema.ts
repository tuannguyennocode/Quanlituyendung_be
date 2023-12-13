import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from '../common/commonSchemaProps';

export type RecruitmentDocument = HydratedDocument<Recruitment>;

@Schema()
export class Recruitment extends CommonSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop()
    name: string;
    @Prop({ type: mongoose.Types.ObjectId, ref: 'Company' })
    companyId: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'JobPosting' })
    jobPostingId: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'UserAccount' })
    userId: mongoose.Types.ObjectId;
    @Prop()
    letter: string;
    @Prop()
    cv_url: string;
}

export const RecruitmentSchema = SchemaFactory.createForClass(Recruitment);
