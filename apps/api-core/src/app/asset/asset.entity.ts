import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AssetTaxonomy } from "./enum/asset-taxonomy.enum";

@Entity({ name: "asset" })
export class AssetEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  assetId: string;

  @Column({ nullable: true })
  userId?: string;

  @Column()
  source: string;

  @Column({ default: AssetTaxonomy.OTHER, type: "enum", enum: AssetTaxonomy })
  taxonomy?: AssetTaxonomy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
