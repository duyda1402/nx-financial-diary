import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from "apps/expo-app/src/common";
import { CredentialOTP, TokenInfo, UserInfo } from "apps/expo-app/src/common/types/user.types";

// Define a type for the slice state

export interface AuthState {
  email: string;
  userId: string;
  info: UserInfo | null | undefined;
  credentials: CredentialOTP | null | undefined;
  tokenInfo: TokenInfo | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  email: "",
  userId: "",
  info: null,
  credentials: null,
  tokenInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    actionSetEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    actionSetUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    actionSetUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.info = action.payload;
    },
    actionSetCredentials: (state, action: PayloadAction<CredentialOTP | null>) => {
      state.credentials = action.payload;
    },
    actionSetTokenInfo: (state, action: PayloadAction<TokenInfo | null>) => {
      if (action.payload?.accessToken) {
        AsyncStorage.setItem(KEY_ACCESS_TOKEN, action.payload.accessToken);
      }
      if (action.payload?.refreshToken) {
        AsyncStorage.setItem(KEY_REFRESH_TOKEN, action.payload.refreshToken);
      }
      state.tokenInfo = action.payload;
    },
  },
});

export const { actionSetEmail, actionSetUserInfo, actionSetUserId, actionSetCredentials, actionSetTokenInfo } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
