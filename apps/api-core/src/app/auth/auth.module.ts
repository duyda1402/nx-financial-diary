import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { OtpModule } from '../otp/otp.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'

@Module({
     imports: [
          UserModule,
          OtpModule,
          JwtModule.register({
               global: true,
          })
     ],
     controllers: [AuthController],
     providers: [AuthService],
     exports: [AuthService]
})
export class AuthModule { }