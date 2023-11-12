import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { generateUUID } from "../../utils";
import { AssetTaxonomy } from "../asset/enum/asset-taxonomy.enum";
import { AssetService } from "./../asset/asset.service";
import { WalletEntity } from "./wallet.entity";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    private assetService: AssetService,
  ) {}

  async getList(userId: string): Promise<WalletEntity[]> {
    const wallets = await this.walletRepository.find({
      where: {
        userId: userId,
      },
      order: {
        createdAt: "ASC",
      },
    });
    return wallets;
  }

  async findWalletBy(
    conditions: FindOptionsWhere<WalletEntity> | FindOptionsWhere<WalletEntity>[],
  ): Promise<WalletEntity> {
    return this.walletRepository.findOneBy(conditions);
  }

  async create(data: DeepPartial<WalletEntity>): Promise<WalletEntity> {
    let thumbnail = data?.thumbnail;
    if (!thumbnail) {
      const assets = await this.assetService.getAssetByTaxonomySystem(AssetTaxonomy.WALLET);
      thumbnail = assets[0]?.source;
    }
    const walletId = generateUUID();
    const wallet = this.walletRepository.create({ ...data, walletId: walletId, thumbnail: thumbnail });
    return this.walletRepository.save(wallet);
  }

  async updateWallet(walletId: string, userId: string, data: DeepPartial<WalletEntity>): Promise<UpdateResult> {
    const wallet = await this.walletRepository.findOne({
      where: { walletId: walletId, userId: userId },
    });
    if (!wallet) {
      throw new NotFoundException("Wallet not found!");
    }
    return this.walletRepository.update({ id: wallet.id }, data);
  }

  async getTotalBalance(userId: string): Promise<number> {
    const wallets = await this.walletRepository.find({ where: { userId: userId } });
    return wallets.reduce((preValue, curRecord) => preValue + curRecord.balance, 0);
  }
}
