/* eslint-disable prettier/prettier */
import {
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAccountService } from 'src/user-account/user-account.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserAccount } from 'src/user-account/user-account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    private userAccountService: UserAccountService,
    private jwtService: JwtService,
    @InjectModel('UserAccount')
    private readonly userModel: Model<UserAccount>
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user =
      await this.userAccountService.findOneForAuthentication(username);
      const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(@Body() createUserDto: CreateUserDto): Promise<string> {
    const {username, password } = createUserDto;

    // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser =
      await this.userAccountService.findOneForAuthentication(username);

    if (existingUser) {
      return 'Username already exists';
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const saltRounds = 10; // Số lần mã hóa (càng cao, càng an toàn)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo người dùng mới với mật khẩu đã mã hóa
    createUserDto.password = hashedPassword;
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    return 'User registered successfully';
  }
}
