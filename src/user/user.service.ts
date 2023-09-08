/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: mongoose.Model<User>) {}
  async isNameUnique(walletAddress: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ walletAddress: walletAddress }).exec();
    return !existingUser;
  }
  async createUser(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}