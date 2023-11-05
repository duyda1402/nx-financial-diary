export type TransactionInfo = {
  id: number;
  transactionId: string;
  userId: string;
  walletId: string;
  name: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  walletReceiveId?: string;
  walletSenderId?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
  TRANSFER = "transfer",
}
