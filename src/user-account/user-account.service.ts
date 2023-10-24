/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserAccount } from "./user-account.schema";
import { SuccessResponse, setSuccessResponse } from "../response/success";
import { UpdateProfileForm } from "./form/update-profile.form";
@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel("UserAccount")
    private readonly userAccountModel: Model<UserAccount>,
  ) {}

  async findOneByEmailForAuthentication(email: string): Promise<UserAccount> {
    let user: UserAccount;
    user = await this.userAccountModel.findOne({ email }).exec();
    return user;
  }
  async getProfile(id: string): Promise<UserAccount> {
    const userAccount = await this.userAccountModel.findOne({ _id: id }).select("-password -state -status -role -hashRt").exec();
    return userAccount;
  }
  async getRefreshTokenById(id: string): Promise<UserAccount> {
    const userAccount = await this.userAccountModel.findOne({ _id: id }).select("hashRt").exec();
    return userAccount;
  }
  async findAll(): Promise<UserAccount[]> {
    const listUserAccount = await this.userAccountModel.find().select('-password -hashRt').exec();
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
