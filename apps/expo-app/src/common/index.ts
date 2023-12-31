import { TransactionType } from "./types/transaction.type";

export const LOGO_URL = "https://cdn-icons-png.flaticon.com/512/3419/3419250.png";

export const KEY_ACCESS_TOKEN = "accessToken";
export const KEY_REFRESH_TOKEN = "refreshToken";

export const BG_BASE =
  "https://images.unsplash.com/photo-1698571401982-855eac4f6887?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const TransactionTypeData: Array<{ label: string; value: TransactionType }> = [
  { label: "Expense", value: TransactionType.EXPENSE },
  { label: "Income", value: TransactionType.INCOME },
  { label: "Transfer", value: TransactionType.TRANSFER },
];
