/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  bio: string;
  @Prop()
  email: string;
  @Prop()
  walletAddress: string;
  @Prop()
  avatar: string;
  @Prop()
  banner: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
