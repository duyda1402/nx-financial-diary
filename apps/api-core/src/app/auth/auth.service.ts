import { BadGatewayException, BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { OtpService } from '../otp/otp.service';
import { UserService } from './../user/user.service';

import { MessageCode } from '../../common/enum/message-code.enum';
import { UserEntity } from '../user/entity/user.entity';
import { Tokens } from './dto/token.dto';

import * as bcrypt from 'bcrypt';
import { ERROR_UNAUTHORIZED } from '../../common/error.common';
import { PayloadToken } from '../../common/types/payload.types';
@Injectable()
export class AuthService {
     constructor(
          private userService: UserService,
          private otpService: OtpService,
          private jwtService: JwtService
     ) { }

     async initialize(email: string, userId: string) {
          const user = await this.userService.findUserBy({ email, userId })
          if (!user) {
               throw new BadRequestException({ code: MessageCode.NOT_FOUND, message: "Not Found" });
          }
          const otp = await this.otpService.generateOtp(userId)
          return {
               createAt: otp.startAt,
               id: otp.transactionId,
               ttl: otp.ttl
          }
     }

     async finalize(transactionId: string, codeOtp: string): Promise<Tokens> {
          const verified = await this.otpService.verifyOtp(transactionId, codeOtp)

          const user = await this.userService.findUserBy({ userId: verified.userId })
          if (!user.isVerified) {
               this.userService.updateUserById(verified.userId, { isVerified: true })
          }
          const tokens = await this.generateTokens(user)
          // Save Cookies and Authentication JWT , lastedLoginAt
          return tokens
     }

     async handlerResetToken(refreshToken: string): Promise<Tokens> {
          if (!refreshToken) {
               throw new UnauthorizedException(ERROR_UNAUTHORIZED);
          }
          let payload: PayloadToken
          try {
               payload = await this.jwtService.verifyAsync(
                    refreshToken,
                    {
                         secret: process.env.JWT_SECRET_RT
                    }
               );
          } catch {
               throw new UnauthorizedException(ERROR_UNAUTHORIZED);
          }
          const user = await this.userService.findUserBy({ userId: payload.sub })
          if (!user) {
               throw new UnauthorizedException(ERROR_UNAUTHORIZED);
          }
          const tokens = this.generateTokens(user)
          return tokens
     }

     async generateTokens(user: UserEntity): Promise<Tokens> {
          const payload = {
               sub: user.userId,
               email: user.email
          }
          const accessToken = await this.jwtService.signAsync(payload, {
               secret: process.env.JWT_SECRET_AT,
               expiresIn: '15m'
          })
          const refreshToken = await this.jwtService.signAsync(payload, {
               expiresIn: '7d',
               secret: process.env.JWT_SECRET_RT
          })
          bcrypt.hash(refreshToken, 10, (err, hash) => {
               if (err) {
                    throw new BadGatewayException("Generate hash token failed")
               }
               this.userService.updateUserById(user.userId, { lastedLoginAt: new Date(), hash })
          })

          return { accessToken, refreshToken }
     }
}
