import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "./transaction.entity";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { WalletModule } from "../wallet/wallet.module";

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), WalletModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
