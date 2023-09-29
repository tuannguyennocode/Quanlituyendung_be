/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserAccount } from "./user-account.schema";
import { SuccessResponse, setSuccessResponse } from "src/response/success";
@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel("UserAccount")
    private readonly userModel: Model<UserAccount>,
  ) {}

  async findOneForAuthentication(field: string, type: string): Promise<UserAccount> {
    let user: UserAccount;
    if (type === "username") {
      user = await this.userModel.findOne({ username: field }).select("username password").exec();
    } else if (type === "email") {
      user = await this.userModel.findOne({ email: field }).select("email").exec();
    }
    return user;
  }
  async findOne(username: string): Promise<UserAccount> {
    const userAccount = await this.userModel.findOne({ username: username }).select("-password");
    return userAccount;
  }
  async findAll(): Promise<UserAccount[]> {
    const listUserAccount = await this.userModel.find().exec();
    return listUserAccount;
  }
}
