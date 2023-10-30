import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { WalletEntity } from "./wallet.entity";
import { generateUUID } from "../../utils";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
  ) {}

  async getList(userId: string): Promise<WalletEntity[]> {
    const wallets = await this.walletRepository.find({
      where: {
        userId: userId,
      },
    });
    return wallets;
  }

  async create(data: DeepPartial<WalletEntity>): Promise<WalletEntity> {
    const walletId = generateUUID();
    const wallet = this.walletRepository.create({ ...data, walletId: walletId });
    return this.walletRepository.save(wallet);
  }

  async getTotalBalance(userId: string): Promise<number> {
    const wallets = await this.walletRepository.find({ where: { userId: userId } });
    return wallets.reduce((preValue, curRecord) => preValue + curRecord.balance, 0);
  }
}
