import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TransactionType } from "../../common/enum/transaction.enum";

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  amount: number;

  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  walletReceiveId: string;

  @IsOptional()
  @IsString()
  walletSenderId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
