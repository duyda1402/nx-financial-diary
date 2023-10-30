import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CURRENCY } from "./dto/currency.enum";
import { LANGUAGE } from "./dto/lang.enum";

@Entity({ name: "attribute" })
export class AttributeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: string;

  @Column({ default: CURRENCY.USD, type: "enum", enum: CURRENCY })
  currency?: CURRENCY;

  @Column({ default: LANGUAGE.EN, type: "enum", enum: LANGUAGE })
  lang?: LANGUAGE;

  @Column({ nullable: true })
  passcode?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
