import { ResponseAPI } from "../common/types/response.types";
import { CredentialOTP, TokenInfo, UserInfo } from "../common/types/user.types";
import { WalletInfo } from "../common/types/wallet.type";
import apiClient from "./index";

export const apiGetTotalBalance = async () => {
  const res = await apiClient.get<any, ResponseAPI<number>>("/wallet/balance");
  return res.data;
};

export const apiWalletByUser = async () => {
  const res = await apiClient.get<any, ResponseAPI<WalletInfo[]>>("/wallet");
  return res.data;
};
