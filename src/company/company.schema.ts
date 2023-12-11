import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from '../common/commonSchemaProps';
import { JobPosting } from '../jobposting/jobposting.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company extends CommonSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop()
    name: string;

    @Prop()
    avatar_url: string;

    @Prop({ unique: true })
    phoneNumber: string;

    @Prop({ unique: true })
    email: string;
    
    @Prop()
    avatar_url: string;

    @Prop()
    address: string;

    @Prop()
    company_size: string;

    @Prop()
    web_url: string;

    @Prop()
    description: string;

    @Prop({ ref: 'JobPosting' })
    jobPostings: JobPosting[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
