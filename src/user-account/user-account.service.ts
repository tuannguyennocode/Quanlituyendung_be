/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserAccount } from "./user-account.schema";
import { SuccessResponse, setSuccessResponse } from "../response/success";
@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel("UserAccount")
    private readonly userAccountModel: Model<UserAccount>,
  ) {}

  async findOneForAuthentication(field: string, type: string): Promise<UserAccount> {
    let user: UserAccount;
    if (type === "username") {
      user = await this.userAccountModel.findOne({ username: field }).select("username password role state").exec();
    } else if (type === "email") {
      user = await this.userAccountModel.findOne({ email: field }).select("email").exec();
    }
    return user;
  }
  async findById(id: string): Promise<UserAccount> {
    const userAccount = await this.userAccountModel.findOne({ _id: id }).exec();
    return userAccount;
  }
  async findByUserName(username: string): Promise<UserAccount> {
    const userAccount = await this.userAccountModel.findOne({ username: username }).select("-password").exec();
    return userAccount;
  }
  async findAll(): Promise<UserAccount[]> {
    const listUserAccount = await this.userAccountModel.find().exec();
    return listUserAccount;
  }
  async updateOne(id: string, updateData: Partial<UserAccount>): Promise<SuccessResponse> {
    const userAccount = await this.userAccountModel.findById(id).exec();

    if (!userAccount) {
      throw new NotFoundException(`Object with ID ${id} not found.`);
    }
    Object.assign(userAccount, updateData);

    await userAccount.save();
    return setSuccessResponse("Cập nhật thành công");
  }
}
