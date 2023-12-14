import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from '../common/commonSchemaProps';
import { StateRecruitment } from './enum/state.enum';

export type RecruitmentDocument = HydratedDocument<Recruitment>;

@Schema()
export class Recruitment extends CommonSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop()
    name: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'JobPosting' })
    jobPostingId: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'UserAccount' })
    userId: mongoose.Types.ObjectId;
    @Prop()
    letter: string;
    @Prop()
    cv_url: string;
    @Prop({ enum: StateRecruitment, default: StateRecruitment.INPROCCESS })
    state: StateRecruitment;
}

export const RecruitmentSchema = SchemaFactory.createForClass(Recruitment);
