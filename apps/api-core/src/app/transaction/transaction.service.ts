import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Not, Repository, UpdateResult } from "typeorm";
import { TransactionType } from "../../common/enum/transaction.enum";
import { generateUUID } from "../../utils";
import { WalletService } from "../wallet/wallet.service";
import { CreateTransactionDto, UpdateTransactionDto } from "./transaction.dto";
import { TransactionEntity } from "./transaction.entity";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private walletService: WalletService,
  ) {}

  async getListByUser(userId: string): Promise<TransactionEntity[]> {
    const transactions = await this.transactionRepository.find({
      where: {
        userId: userId,
        type: Not(TransactionType.TRANSFER),
      },
    });
    return transactions;
  }

  async getListByWallet(walletId: string, userId: string): Promise<TransactionEntity[]> {
    const transactions = await this.transactionRepository.find({
      where: [
        {
          walletId: walletId,
          userId: userId,
        },
        {
          walletReceiveId: walletId,
          userId: userId,
        },
      ],
    });
    return transactions;
  }

  async create(userId: string, data: CreateTransactionDto): Promise<TransactionEntity> {
    const transactionId = generateUUID();
    const { walletId, amount, walletReceiveId, type } = data;
    const wallet = await this.walletService.findWalletBy({ walletId });
    const curBalance = wallet?.balance || 0;
    switch (type) {
      case TransactionType.INCOME:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance + amount });
        break;
      case TransactionType.EXPENSE:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance - amount });
        break;
      case TransactionType.TRANSFER:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance - amount });
        const walletReceive = await this.walletService.findWalletBy({ walletId: walletReceiveId });
        const curReceiveBalance = walletReceive?.balance || 0;
        this.walletService.updateWallet(walletReceiveId, userId, { balance: curReceiveBalance + amount });
        break;
      default:
        throw new BadRequestException("Type transaction require");
    }
    const transaction = this.transactionRepository.create({
      ...data,
      releaseAt: data?.releaseAt || new Date(),
      transactionId: transactionId,
    });
    return this.transactionRepository.save(transaction);
  }

  async update(transactionId: string, userId: string, data: UpdateTransactionDto): Promise<UpdateResult> {
    const curRecord = await this.transactionRepository.findOneBy({ transactionId, userId });
    if (!curRecord) {
      throw new BadRequestException("Transaction not found");
    }
    const { walletId, amount, walletReceiveId, type } = curRecord;
    const wallet = await this.walletService.findWalletBy({ walletId });
    const curBalance = wallet?.balance || 0;
    switch (type) {
      case TransactionType.INCOME:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance - amount + +data?.amount });
        break;
      case TransactionType.EXPENSE:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance + amount - +data?.amount });
        break;
      case TransactionType.TRANSFER:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance + amount - +data?.amount });
        const walletReceive = await this.walletService.findWalletBy({ walletId: walletReceiveId });
        const curReceiveBalance = walletReceive?.balance || 0;
        this.walletService.updateWallet(walletReceiveId, userId, {
          balance: curReceiveBalance - amount + +data?.amount,
        });
        break;
      default:
        throw new BadRequestException("Type transaction require");
    }
    return this.transactionRepository.update({ transactionId: transactionId }, data);
  }

  async delete(transactionId: string, userId: string): Promise<DeleteResult> {
    const curRecord = await this.transactionRepository.findOneBy({ transactionId, userId });
    if (!curRecord) {
      throw new BadRequestException("Transaction not found");
    }
    const { walletId, amount, walletReceiveId, type } = curRecord;
    const wallet = await this.walletService.findWalletBy({ walletId });
    const curBalance = wallet?.balance || 0;
    switch (type) {
      case TransactionType.INCOME:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance - amount });
        break;
      case TransactionType.EXPENSE:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance + amount });
        break;
      case TransactionType.TRANSFER:
        this.walletService.updateWallet(walletId, userId, { balance: curBalance + amount });
        const walletReceive = await this.walletService.findWalletBy({ walletId: walletReceiveId });
        const curReceiveBalance = walletReceive?.balance || 0;
        this.walletService.updateWallet(walletReceiveId, userId, {
          balance: curReceiveBalance - amount,
        });
        break;
      default:
        throw new BadRequestException("Type transaction require");
    }
    return this.transactionRepository.delete({ transactionId });
  }
}
