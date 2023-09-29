/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Role } from "./enum/role.enum";
import { State } from "./enum/state.enum";
import { Status } from "./enum/status.enum";

export type UserDocument = HydratedDocument<UserAccount>;

@Schema()
export class UserAccount {
  _id: mongoose.Types.ObjectId;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop({ default: new Date() })
  creationTime: Date;
  @Prop({ enum: Role, default: Role.CANDIDATE })
  role: Role;
  @Prop({ enum: State, default: State.UNAUTHENTICATED })
  state: State;
  @Prop({ enum: Status, default: Status.INPROCESS })
  status: Status;
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
