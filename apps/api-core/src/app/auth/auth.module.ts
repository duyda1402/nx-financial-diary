import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { OtpModule } from "../otp/otp.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { WalletModule } from "../wallet/wallet.module";
import { AttributeModule } from "../attribute/attribute.module";
import { MailingModule } from "../mailing/mailing.module";

@Module({
  imports: [
    UserModule,
    OtpModule,
    WalletModule,
    AttributeModule,
    MailingModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
