/* eslint-disable prettier/prettier */
import { Body, Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { UserAccountService } from '../user-account/user-account.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterForm } from './form/register.form';
import * as bcrypt from 'bcrypt';
import { UserAccount } from '../user-account/user-account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { errorMessages } from '../response/errors/custom';
import { SuccessResponse, setSuccessResponse } from '../response/success';
import { LoginForm } from './form/login.form';
import { jwtConstants } from './constants';
import { sendEmail } from '../utils/sendEmail';
import { confirmEmailLink } from '../utils/confirmEmailLink';
import { State } from '../user-account/enum/state.enum';
@Injectable()
export class AuthService {
    constructor(
        private userAccountService: UserAccountService,
        private jwtService: JwtService,
        @InjectModel('UserAccount')
        private readonly userModel: Model<UserAccount>,
    ) {}

    async signIn(loginForm: LoginForm): Promise<SuccessResponse> {
        const { email, password } = loginForm;
        const user = await this.userAccountService.findOneByEmailForAuthentication(email);
        if(user==null){
            throw new ConflictException(errorMessages.auth.wrongCredentials);
        }
        const { role, state } = user;
        if (await bcrypt.compare(password, user?.password)) {
            const tokens = await this.getTokens(user);

            const rtHash = await this.hashByBcrypt(tokens.refresh_token);

            await this.userAccountService.updateOne(user._id.toString(), { hashRt: rtHash });
            const response = { ...tokens, role, state };
            return setSuccessResponse('Đăng nhập thành công', response);
        } else {
            throw new ConflictException(errorMessages.auth.wrongCredentials);
        }
    }
    async signUp(@Body() registerForm: RegisterForm): Promise<SuccessResponse> {
        const { password, email, hostUI } = registerForm;
        let userId: string;
        const userExistingEmail = await this.userAccountService.findOneByEmailForAuthentication(email);
        if (userExistingEmail && userExistingEmail.state !== State.UNAUTHENTICATED) {
            throw new ConflictException(errorMessages.auth.emailAlreadyExist);
        } else if (userExistingEmail && userExistingEmail.state == State.UNAUTHENTICATED) {
            userId = userExistingEmail?._id.toString();
            this.userAccountService.updateOne(userId, {
                password: await this.hashByBcrypt(password),
            });
            await sendEmail(email, await confirmEmailLink(userId, hostUI));
        } else {
            registerForm.password = await this.hashByBcrypt(password);
            const newUser = new this.userModel(registerForm);
            const user = await newUser.save();
            userId = user.id;
            await sendEmail(email, await confirmEmailLink(userId, hostUI));
        }

        return setSuccessResponse('Đăng ký tài khoản thành công', { email, userId });
    }
    async refreshTokens(userId: string, rt: string) {
        const user = await this.userAccountService.getRefreshTokenById(userId);

        if (!user || !user.hashRt) throw new ForbiddenException('Access Denied.');

        const rtMatches = await bcrypt.compare(rt, user.hashRt);

        if (!rtMatches) throw new ForbiddenException('Access Denied.');

        const tokens = await this.getTokens(user);

        const rtHash = await this.hashByBcrypt(tokens.refresh_token);

        await this.userAccountService.updateOne(userId, { hashRt: rtHash });
        return tokens;
    }
    async logout(userId: string) {
        await this.userAccountService.updateOne(userId, { hashRt: null });
        return setSuccessResponse('Đã đăng xuất tài khoản thành công');
    }
    async getTokens(user: any) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    id: user._id,
                    role: user.role,
                    state: user.state,
                },
                {
                    secret: jwtConstants.secret,
                    expiresIn: '24h',
                },
            ),
            this.jwtService.signAsync(
                {
                    id: user._id,
                },
                {
                    secret: jwtConstants.secret,
                    expiresIn: '30d',
                },
            ),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
            tokenType: 'Bearer Token',
        };
    }
    async hashByBcrypt(data: string) {
        return bcrypt.hash(data, 10);
    }
    async getUserEmailFromToken(token: string): Promise<string | null> {
        try {
            const decodedToken = this.jwtService.verify(token, {
                secret: jwtConstants.secret,
            });
            if (decodedToken && decodedToken.id) {
                
                const userId = decodedToken.id;
                console.log('User ID:', userId); // In ra userId
                const user = await this.userAccountService.getProfile(userId);
                if (user) {
                    return user.email;
                }
            }
        } catch (error) {
            // Xử lý lỗi nếu có
        }

        return null;
    }
}
