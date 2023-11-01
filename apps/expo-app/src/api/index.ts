import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { KEY_ACCESS_TOKEN } from "../common";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL!,
  timeout: 90000,
});

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
  function (error) {
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
    return Promise.reject(error);
  },
);

export default instance;
