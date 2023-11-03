import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

import { generateUUID } from "../../utils";
import { TransactionEntity } from "./transaction.entity";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private walletRepository: Repository<TransactionEntity>,
  ) {}

  async getListByUser(userId: string): Promise<TransactionEntity[]> {
    const recent = await this.walletRepository.find({
      where: {
        userId: userId,
      },
    });
    return recent;
  }

  async getListByWallet(walletId: string, userId: string): Promise<TransactionEntity[]> {
    const recent = await this.walletRepository.find({
      where: {
        walletId: walletId,
        userId: userId,
      },
    });
    return recent;
  }

  async create(data: DeepPartial<TransactionEntity>): Promise<TransactionEntity> {
    const transactionId = generateUUID();
    const recent = this.walletRepository.create({ ...data, transactionId: transactionId });
    return this.walletRepository.save(recent);
  }
}
