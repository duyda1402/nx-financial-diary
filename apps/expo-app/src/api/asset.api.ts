import { AssetInfo } from "./../common/types/asset.types";
import { ResponseAPI } from "../common/types/response.types";
import apiClient from "./index";

export const apiGetAssetByTaxonomy = async (taxonomy: "wallet" | "category" | "backgrounds") => {
  const res = await apiClient.get<any, ResponseAPI<AssetInfo[]>>("/assets/taxonomy/" + taxonomy);
  return res.data;
};
