/* eslint-disable prettier/prettier */
import { Body, Injectable, UnauthorizedException, ConflictException, ForbiddenException } from "@nestjs/common";
import { UserAccountService } from "src/user-account/user-account.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterForm } from "./form/register.form";
import * as bcrypt from "bcrypt";
import { UserAccount } from "src/user-account/user-account.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { errorMessages } from "src/response/errors/custom";
import { SuccessResponse, setSuccessResponse } from "../response/success";
import { LoginForm } from "./form/login.form";
import { jwtConstants } from "./constants";
@Injectable()
export class AuthService {
  constructor(
    private userAccountService: UserAccountService,
    private jwtService: JwtService,
    @InjectModel("UserAccount")
    private readonly userModel: Model<UserAccount>,
  ) {}

  async signIn(loginForm: LoginForm): Promise<SuccessResponse> {
    const { username, password } = loginForm;
    const user = await this.userAccountService.findOneForAuthentication(username, "username");
    if (user && (await bcrypt.compare(password, user?.password))) {
      const tokens = await this.getTokens(user);

      const rtHash = await this.hashByBcrypt(tokens.refresh_token);

      await this.userAccountService.updateOne(user._id.toString(), { hashRt: rtHash });

      return setSuccessResponse("Đăng nhập thành công", tokens);
    } else {
      throw new ConflictException(errorMessages.auth.wrongCredentials);
    }
  }
  async signUp(@Body() registerForm: RegisterForm): Promise<SuccessResponse> {
    const { username, password, email } = registerForm;

    const existingUserName = await this.userAccountService.findOneForAuthentication(username, "username");

    const existingEmail = await this.userAccountService.findOneForAuthentication(email, "email");

    if (existingUserName) {
      throw new ConflictException(errorMessages.auth.userNameAlreadyExist);
    } else if (existingEmail) {
      throw new ConflictException(errorMessages.auth.emailAlreadyExist);
    }

    registerForm.password = await this.hashByBcrypt(password);
    const newUser = new this.userModel(registerForm);
    await newUser.save();
    return setSuccessResponse("Đăng ký tài khoản thành công");
  }
  async refreshTokens(userId: string, rt: string) {
    const user = await this.userAccountService.findById(userId);

    if (!user || !user.hashRt) throw new ForbiddenException("Access Denied.");

    const rtMatches = await bcrypt.compare(rt, user.hashRt);

    if (!rtMatches) throw new ForbiddenException("Access Denied.");

    const tokens = await this.getTokens(user);

    const rtHash = await this.hashByBcrypt(tokens.refresh_token);

    await this.userAccountService.updateOne(userId, { hashRt: rtHash });
    return tokens;
  }
  async logout(userId: string) {
    await this.userAccountService.updateOne(userId, { hashRt: null });
    return setSuccessResponse("Đã đăng xuất tài khoản thành công");
  }
  async getTokens(user: any) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user._id,
          username: user.username,
          role: user.role,
          state: user.state,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: "24h",
        },
      ),
      this.jwtService.signAsync(
        {
          id: user._id,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: "30d",
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
      tokenType: "Bearer Token",
    };
  }
  async hashByBcrypt(data: string) {
    return bcrypt.hash(data, 10);
  }
}
