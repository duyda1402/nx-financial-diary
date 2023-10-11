import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ unique: true })
     email: string;

     @Column({ unique: true })
     userId: string;

     @Column({ nullable: true })
     hash?: string;

     @Column({ nullable: true })
     displayName?: string;

     @Column({ nullable: true })
     profileUrl?: string;

     @Column({ default: false })
     isVerified: boolean;

     @Column({ nullable: true })
     lastedLoginAt: Date;

     @CreateDateColumn()
     createdAt: Date;

     @UpdateDateColumn()
     updatedAt: Date;
}