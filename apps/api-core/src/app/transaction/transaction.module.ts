import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletModule } from "../wallet/wallet.module";
import { TransactionController } from "./transaction.controller";
import { TransactionEntity } from "./transaction.entity";
import { TransactionService } from "./transaction.service";

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), WalletModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
