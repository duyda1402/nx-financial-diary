import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum StatusOtp {
     pending = "pending",
     verified = "verified",
     failed = "failed",
}

@Entity({ name: 'otp' })
export class OtpEntity extends BaseEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     userId: string;

     @Column()
     codeOtp: string;

     @Column({ unique: true })
     transactionId: string;

     @Column({ default: 300 })
     ttl: number;

     @Column({ default: StatusOtp.pending, enum: StatusOtp, type: "enum", })
     status: StatusOtp;

     @Column({ nullable: true })
     startAt: Date;

     @CreateDateColumn()
     createdAt: Date;

     @UpdateDateColumn()
     updatedAt: Date;
}