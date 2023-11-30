export type TransactionInfo = {
  id: number;
  transactionId: string;
  userId: string;
  walletId: string;
  subject: string;
  thumbnail: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  walletReceiveId?: string;
  releaseAt: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
  TRANSFER = "transfer",
}
