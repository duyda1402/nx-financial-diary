import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TransactionType } from "../../common/enum/transaction.enum";

export class CreateTransactionDto {
  @IsOptional()
  amount: number;

  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  releaseAt: Date;

  @IsOptional()
  @IsString()
  walletReceiveId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;
}

export class UpdateTransactionDto {
  @IsOptional()
  amount: number;

  @IsOptional()
  releaseAt: Date;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
