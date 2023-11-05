import { TransactionType } from "./transaction.type";

export type CategoryInfo = {
  id: number;
  userId: string;
  thumbnail?: string;
  name: string;
  type: TransactionType;
  categoryId?: string;
  description?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
};
