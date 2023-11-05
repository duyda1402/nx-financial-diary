import { ResponseAPI } from "../common/types/response.types";
import { TransactionInfo } from "../common/types/transaction.type";

import apiClient from "./index";

export const apiGetTransactionByUser = async () => {
  const res = await apiClient.get<any, ResponseAPI<TransactionInfo[]>>("/recent");
  return res?.data || [];
};
