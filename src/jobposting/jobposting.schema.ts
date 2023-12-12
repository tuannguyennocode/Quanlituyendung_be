/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from '../common/commonSchemaProps';
import { Company } from 'src/company/company.schema';

export type JobPostingDocument = HydratedDocument<JobPosting>;

@Schema()
export class JobPosting extends CommonSchemaProps {
    _id: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Company' })
    company: mongoose.Types.ObjectId;

    @Prop()
    name: string;
    // Thêm trường startDate và endDate
    @Prop()
    startDate: string; // Định dạng ngày bắt đầu

    @Prop()
    endDate: string; // Định dạng ngày kết thúc
    // Thêm trường detail theo cấu trúc bạn đã mô tả
    @Prop({ type: JSON })
    detail: object;
}

export const JobPostingSchema = SchemaFactory.createForClass(JobPosting);
