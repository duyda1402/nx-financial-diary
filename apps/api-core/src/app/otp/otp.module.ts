import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entity/otp.entity';
import { OtpService } from './otp.service';


@Module({
     imports: [TypeOrmModule.forFeature([OtpEntity])],
     providers: [OtpService],
     exports: [OtpService]
})
export class OtpModule { }
