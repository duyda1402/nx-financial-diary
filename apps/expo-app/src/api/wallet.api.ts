import { ResponseAPI } from "../common/types/response.types";
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

export type BodyCreateWallet = {
  name: string;
  balance: number;
  thumbnail?: string;
  description?: string;
};

export const apiCreateWallet = async ({ name, balance = 0, thumbnail, description }: BodyCreateWallet) => {
  const res = await apiClient.post<any, ResponseAPI<WalletInfo>>("/wallet", {
    name,
    balance,
    thumbnail,
    description,
  });
  return res.data;
};
