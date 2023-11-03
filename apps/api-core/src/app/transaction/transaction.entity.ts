import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TransactionType } from "../../common/enum/transaction.enum";

@Entity({ name: "transaction" })
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  transactionId: string;

  @Column()
  userId: string;

  @Column()
  walletId: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ type: "enum", enum: TransactionType })
  type: TransactionType;

  @Column({ nullable: true })
  categoryId?: string;

  @Column({ nullable: true })
  walletReceiveId?: string;

  @Column({ nullable: true })
  walletSenderId?: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
