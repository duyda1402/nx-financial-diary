import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CategoryInfo } from "apps/expo-app/src/common/types/category.types";
import { WalletInfo } from "apps/expo-app/src/common/types/wallet.type";

// Define a type for the slice state

export interface ResourcesState {
  categories: CategoryInfo[];
  wallets: WalletInfo[];
  totalBalance: number;
}

// Define the initial state using that type
const initialState: ResourcesState = {
  categories: [],
  wallets: [],
  totalBalance: 0,
};

export const resourcesSlice = createSlice({
  name: "resources",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    actionSetWallets: (state, action: PayloadAction<WalletInfo[]>) => {
      state.wallets = action.payload;
    },
    actionSelectCategory: (state, action: PayloadAction<CategoryInfo[]>) => {
      state.categories = action.payload;
    },
    actionSetTotalBalance: (state, action: PayloadAction<number>) => {
      state.totalBalance = action.payload;
    },
  },
});

export const { actionSetTotalBalance, actionSelectCategory, actionSetWallets } = resourcesSlice.actions;

export const resourcesReducer = resourcesSlice.reducer;
