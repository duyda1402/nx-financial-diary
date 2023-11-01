import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { generateUUID } from "../../utils";
import { AssetEntity } from "./asset.entity";
import { AssetTaxonomy } from "./enum/asset-taxonomy.enum";

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
  ) {}

  async getAssetById(id: string): Promise<AssetEntity> {
    return this.assetRepository.findOneBy({ assetId: id });
  }

  async createAsset(body: { userId: string; path: string; taxonomy?: AssetTaxonomy }): Promise<AssetEntity> {
    const assetId = generateUUID();
    const asset = this.assetRepository.create({
      assetId,
      source: body.path,
      taxonomy: body?.taxonomy,
      userId: body.userId,
    });
    return this.assetRepository.save(asset);
  }

  async getAssetByTaxonomy(type: AssetTaxonomy): Promise<AssetEntity[]> {
    return this.assetRepository.find({ where: { taxonomy: type } });
  }
}
