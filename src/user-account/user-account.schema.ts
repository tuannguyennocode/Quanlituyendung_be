/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserAccount>;

@Schema()
export class UserAccount {
  _id: mongoose.Types.ObjectId;
  @Prop()
  username: string;
  @Prop()
  password:string;
  @Prop()
  email:string;
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
