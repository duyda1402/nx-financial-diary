import { CategoryInfo } from "../common/types/category.types";
import { ResponseAPI } from "../common/types/response.types";
import apiClient from "./index";

export const apiGetCategories = async () => {
  const res = await apiClient.get<any, ResponseAPI<CategoryInfo[]>>("/category");
  return res.data;
};
