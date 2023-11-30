import { ResponseAPI } from "../common/types/response.types";
import { TransactionInfo } from "../common/types/transaction.type";

import apiClient from "./index";

export const apiGetTransactionByUser = async () => {
  const res = await apiClient.get<any, ResponseAPI<TransactionInfo[]>>("/transaction");
  return res?.data || [];
};

export const apiGetTransactionByWallet = async (walletId: string) => {
  const res = await apiClient.get<any, ResponseAPI<TransactionInfo[]>>("/transaction/wallet/" + walletId);
  return res?.data || [];
};

type BodyCreateTransaction = {
  subject?: string;
  amount: number;
  walletId?: string;
  type: "expense" | "income" | "transfer";
  categoryId?: string;
  releaseAt: Date;
  walletReceiveId?: string;
  description: string;
  thumbnail?: string;
};

export const apiCreateTransaction = async (data: BodyCreateTransaction) => {
  const res = await apiClient.post<any, ResponseAPI<TransactionInfo>>("/transaction", data);
  return res?.data;
};
