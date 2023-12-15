import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssetModule } from "../asset/asset.module";
import { WalletController } from "./wallet.controller";
import { WalletEntity } from "./wallet.entity";
import { WalletService } from "./wallet.service";
import { TransactionEntity } from "../transaction/transaction.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, TransactionEntity]), AssetModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
