import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CategoryInfo } from "apps/expo-app/src/common/types/category.types";
import { TransactionType } from "apps/expo-app/src/common/types/transaction.type";
import { WalletInfo } from "apps/expo-app/src/common/types/wallet.type";

// Define a type for the slice state

export interface SelectorState {
  category: CategoryInfo | null;
  wallet: WalletInfo | null;
  transactionType: TransactionType;
  transactionId: string;
}

// Define the initial state using that type
const initialState: SelectorState = {
  category: null,
  wallet: null,
  transactionType: TransactionType.EXPENSE,
  transactionId: "",
};

export const selectorSlice = createSlice({
  name: "selector",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    actionSelectWallet: (state, action: PayloadAction<WalletInfo | null>) => {
      state.wallet = action.payload;
    },
    actionSelectCategory: (state, action: PayloadAction<CategoryInfo | null>) => {
      state.category = action.payload;
    },
    actionRemoveSelectCategory: (state) => {
      state.category = null;
    },
    actionRemoveSelectWallet: (state) => {
      state.category = null;
    },
    actionSelectTransactionType: (state, action: PayloadAction<TransactionType>) => {
      state.transactionType = action.payload;
    },
    actionSelectTransaction: (state, action: PayloadAction<string>) => {
      state.transactionId = action.payload;
    },
  },
});

export const {
  actionRemoveSelectCategory,
  actionRemoveSelectWallet,
  actionSelectCategory,
  actionSelectWallet,
  actionSelectTransactionType,
  actionSelectTransaction,
} = selectorSlice.actions;

export const selectorReducer = selectorSlice.reducer;
