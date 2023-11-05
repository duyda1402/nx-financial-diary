import { ResponseAPI } from "../common/types/response.types";
import { CredentialOTP, TokenInfo, UserInfo } from "../common/types/user.types";
import apiClient from "./index";

export const apiFetchUserByEmail = async (email: string) => {
  const res = await apiClient.post<any, ResponseAPI<UserInfo>>("/user", {
    email: email,
  });
  return res;
};

export const apiCreateUserByEmail = async (email: string) => {
  const res = await apiClient.post<any, ResponseAPI<UserInfo>>("/users", {
    email: email,
  });
  return res;
};

export const apiLoginInitialize = async (email: string, userId: string) => {
  const res = await apiClient.post<any, ResponseAPI<CredentialOTP>>("/passcode/login/initialize", {
    email: email,
    userId: userId,
  });
  return res;
};

export const apiLoginFinalize = async (id: string, code: string) => {
  const res = await apiClient.post<any, ResponseAPI<TokenInfo>>("/passcode/login/finalize", {
    id: id,
    code: code,
  });
  return res;
};

export const apiGetMe = async () => {
  const res = await apiClient.get<any, ResponseAPI<{ id: string }>>("/me");
  return res;
};

export const apiGetUserById = async (userId: string) => {
  const res = await apiClient.get<any, ResponseAPI<UserInfo>>("/users/" + userId);
  return res;
};

export const apiUploadAsset = async (formData: any) => {
  const res = await apiClient.post<any, ResponseAPI<UserInfo>>("/assets/upload", formData);
  return res;
};
