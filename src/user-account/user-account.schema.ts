/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from './enum/role.enum';
import { State } from './enum/state.enum';
import { CommonSchemaProps } from '../common/commonSchemaProps';
import { Recruitment } from 'src/recruitment/recruitment.schema';

export type UserDocument = HydratedDocument<UserAccount>;

@Schema()
export class UserAccount extends CommonSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop()
    companyId: mongoose.Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    password: string;
    @Prop()
    email: string;
    @Prop({ enum: Role, default: Role.CANDIDATE })
    role: Role;
    @Prop({ enum: State, default: State.UNAUTHENTICATED })
    state: State;

    @Prop()
    hashRt: string;
    @Prop({ type: JSON })
    profile: Object;
    @Prop({ ref: 'Recruitment' })
    recruitment: Recruitment[];
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
