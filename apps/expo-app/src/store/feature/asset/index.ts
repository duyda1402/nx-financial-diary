import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AssetInfo } from "apps/expo-app/src/common/types/asset.types";

// Define a type for the slice state

export interface ResourcesState {
  categories: AssetInfo[];
  wallets: AssetInfo[];
}

// Define the initial state using that type
const initialState: ResourcesState = {
  categories: [],
  wallets: [],
};

export const assetSlice = createSlice({
  name: "asset",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    actionSetAssetWallets: (state, action: PayloadAction<AssetInfo[]>) => {
      state.wallets = action.payload;
    },
    actionSetAssetCategory: (state, action: PayloadAction<AssetInfo[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { actionSetAssetWallets, actionSetAssetCategory } = assetSlice.actions;

export const assetReducer = assetSlice.reducer;
