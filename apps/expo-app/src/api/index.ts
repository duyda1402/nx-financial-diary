import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { HttpStatusCode } from "axios";
import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from "../common";
import { TokenInfo } from "../common/types/user.types";
import { ResponseAPI } from "../common/types/response.types";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL!,
  timeout: 90000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

async function refreshAccessToken() {
  const refreshToken = await AsyncStorage.getItem(KEY_REFRESH_TOKEN);
  const URL_REFRESH_TOKEN = process.env.EXPO_PUBLIC_API_BASE_URL! + "/auth/refresh";
  try {
    const response = await axios.post(URL_REFRESH_TOKEN, { refreshToken: refreshToken });
    const result: ResponseAPI<TokenInfo> = response.data;
    const tokens = result.data;
    await AsyncStorage.setItem(KEY_ACCESS_TOKEN, tokens.accessToken);
    await AsyncStorage.setItem(KEY_REFRESH_TOKEN, tokens.refreshToken);
    return tokens;
  } catch (error: any) {
    console.error("Refresh token error: ", error.message);
    throw error;
  }
}

instance.interceptors.request.use(
  async function (config) {
    const accessToken = await AsyncStorage.getItem(KEY_ACCESS_TOKEN);
    if (accessToken !== null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(`
         |-------------------------------------------
         |-- [LOG]: REQUEST
         |-- [Url]: ${config?.baseURL}${config?.url}
         |-- [Method]: ${config?.method?.toLocaleUpperCase()}
         |-- [Body]: ${config?.data ? JSON.stringify(config?.data) : "empty"}
         |-- [Headers]: ${JSON.stringify(config.headers)}
         |-------------------------------------------
         `);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    console.log(`
         |-------------------------------------------
         |-- [LOG]: RESPONSE SUCCESS
         |-- [Url]: ${response?.config?.baseURL}${response?.config?.url}
         |-- [Method]: ${response?.config?.method?.toLocaleUpperCase()}
         |-- [Body]: ${response?.config?.data ? JSON.stringify(response?.config?.data) : "empty"}
         |-- [Headers]: ${JSON.stringify(response?.config.headers)}
         |-- [Status Code]: ${response?.status}
         |-- [Data]: ${JSON.stringify(response?.data)}
         |-------------------------------------------
      `);
    return response.data;
  },
  async function (error: any) {
    const originalRequest = error.config;
    console.log(error);
    if (error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const tokens = await refreshAccessToken();
          originalRequest._retry = true;
          originalRequest.headers.Authorization = `Bearer ${tokens?.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      } else {
        isRefreshing = true;
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        failedQueue.forEach((failedRequest) => {
          failedRequest.headers.Authorization = `Bearer ${newToken?.accessToken}`;
          instance(failedRequest)
            .then((response) => {
              failedRequest.resolve(response);
            })
            .catch((err) => {
              failedRequest.reject(err);
            });
        });
        // Xóa hàng đợi
        failedQueue = [];
        originalRequest.headers.Authorization = `Bearer ${newToken?.accessToken}`;
        return instance(originalRequest);
      }
    } else {
      console.log(`
      |-------------------------------------------
      |-- [LOG]: RESPONSE ERROR
      |-- [Url]: ${error?.config?.baseURL}${error?.config?.url}
      |-- [Method]: ${error?.config?.method?.toLocaleUpperCase()}
      |-- [Body]: ${error?.config?.data ? JSON.stringify(error?.config?.data) : "empty"}
      |-- [Headers]: ${JSON.stringify(error?.config.headers)}
      |-- [Status Code]: ${error?.status}
      |-- [Message Error]: ${error?.message}
      |-------------------------------------------
      `);
    }
    return Promise.reject(error);
  },
);

export default instance;
