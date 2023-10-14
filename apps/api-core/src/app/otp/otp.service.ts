import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomBytes } from "crypto";
import { Repository } from "typeorm";
import { generateUUID } from "../../utils";
import { OtpEntity, StatusOtp } from "./entity/otp.entity";
import { OTP_EXPIRED, OTP_NOT_AVAILABLE } from "../../common/error.common";

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
  ) {}

  async generateOtp(userId: string, ttl?: number): Promise<OtpEntity> {
    //3 bytes generate 6 chart (3x2)
    const codeOtp = randomBytes(3).readUIntBE(0, 3).toString().substring(0, 6);
    const transactionId = generateUUID();
    const record = this.otpRepository.create({
      transactionId: transactionId,
      userId: userId,
      ttl: ttl,
      codeOtp: codeOtp,
      startAt: new Date(),
    });
    return this.otpRepository.save(record);
  }
  async verifyOtp(transactionId: string, codeOtp: string): Promise<OtpEntity> {
    const transaction = await this.otpRepository.findOneBy({
      transactionId,
      codeOtp,
      status: StatusOtp.pending,
    });
    if (!transaction) {
      throw new BadRequestException(OTP_NOT_AVAILABLE);
    }
    if (new Date(transaction.startAt).getTime() + transaction.ttl * 1000 < Date.now()) {
      throw new BadRequestException(OTP_EXPIRED);
    }
    this.otpRepository.update({ transactionId }, { status: StatusOtp.verified });
    return transaction;
  }
}
