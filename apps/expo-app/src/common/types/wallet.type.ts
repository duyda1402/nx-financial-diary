export type WalletInfo = {
  id: number;
  walletId: string;
  userId: string;
  name: string;
  balance: number;
  thumbnail: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};
