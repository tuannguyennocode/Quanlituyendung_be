/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAccount } from './user-account.schema';
@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel('UserAccount')
    private readonly userModel: Model<UserAccount>,
  ) {}

  findOneForAuthentication(username: string): Promise<UserAccount> {
    const user = this.userModel.findOne({ username: username }).select('username password');
    return user;
  }
  findOne(username: string): Promise<UserAccount>{
    const user = this.userModel.findOne({ username: username }).select('-password');
    return user;
  }
}
