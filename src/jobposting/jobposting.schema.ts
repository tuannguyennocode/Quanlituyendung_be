/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from '../common/commonSchemaProps';
import { Company } from 'src/company/company.schema';
import { MasterDataType } from 'src/master-data-type/master-data-type.schema';
import { Recruitment } from 'src/recruitment/recruitment.schema';

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
    @Prop({ ref: 'MasterDataType' })
    skills: MasterDataType[];
    @Prop({ ref: 'MasterDataType' })
    levels: MasterDataType[];
    @Prop({ ref: 'MasterDataType' })
    job_types: MasterDataType[];
    @Prop({ ref: 'Recruitment' })
    recruitment: Recruitment[];
}

export const JobPostingSchema = SchemaFactory.createForClass(JobPosting);
