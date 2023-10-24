import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommonSchemaProps } from 'src/common/commonSchemaProps';
import { JobPosting } from 'src/jobposting/jobposting.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company extends CommonSchemaProps{
  _id: mongoose.Types.ObjectId;
  @Prop()
  name: string;
  
  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  company_size: string;

  @Prop()
  web_url: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting' }] })
  jobPostings: JobPosting[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
