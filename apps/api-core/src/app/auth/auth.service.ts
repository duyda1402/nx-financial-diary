import { UserService } from './../user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpService } from '../otp/otp.service';
import { MessageCode } from '../../common/enum/error.enum';

@Injectable()
export class AuthService {
     constructor(
          private userService: UserService,
          private otpService: OtpService
     ) { }

     async initialize(email: string, userId: string) {
          const user = await this.userService.findUserBy({ email, userId })
          if (!user) {
               throw new BadRequestException({ code: MessageCode.NOT_FOUND, message: "Not Found" });
          }
          const otp = await this.otpService.generateOtp(userId)
          return {
               createAt: otp.createdAt,
               id: otp.transactionId,
               ttl: otp.ttl
          }
     }

     async finalize(transactionId: string, codeOtp: string) {
          const verified = await this.otpService.verifyOtp(transactionId, codeOtp)
          if (!verified) {
               throw new UnauthorizedException({ code: MessageCode.UNAUTHORIZED, message: "Otp is not authorized" })
          }
          await this.userService.updateUserById(verified.userId, { isVerified: true, lastedLoginAt: new Date() })
          // TODO: 
          // Save Cookies and Authentication JWT
          return {
               auth: true
          }
     }

}
