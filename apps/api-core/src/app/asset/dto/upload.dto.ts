import { IsEnum } from "class-validator";
import { AssetTaxonomy } from "../enum/asset-taxonomy.enum";

export class UploadDto {
  @IsEnum(AssetTaxonomy)
  taxonomy?: AssetTaxonomy;
}
