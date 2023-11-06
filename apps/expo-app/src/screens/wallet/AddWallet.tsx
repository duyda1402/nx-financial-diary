import { colors, sx } from "@nfd/styles";
import { Input } from "@ui-kitten/components";
import { ButtonUI, Group, Stack, TextUI } from "apps/expo-app/src/components/atom";
import { RootState } from "apps/expo-app/src/store";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconChevronLeft from "../../components/atom/icons/IconChevronLeft";
import { useEffect, useState } from "react";
import { apiGetAssetByTaxonomy } from "../../api/asset.api";
import { actionSetAssetWallets } from "../../store/feature/asset";
import { AssetInfo } from "../../common/types/asset.types";
import { mapUrlAsset } from "../../utils";
import { apiCreateWallet } from "../../api/wallet.api";
import { actionAddWalletResources } from "../../store/feature/resources";

export interface SettingTabProps {
  navigation?: any;
}

function AddWalletScreen({ navigation }: SettingTabProps) {
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [assetSelect, setAssetSelect] = useState<AssetInfo | null>(null);
  // Store Init
  const assetWallets = useSelector((state: RootState) => state.asset.wallets);
  const dispatch = useDispatch();
  // Form Init
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      balance: "0",
      description: "",
      name: "",
      thumbnail: "",
    },
  });

  useEffect(() => {
    const fetchAssetWallet = async () => {
      const assets = await apiGetAssetByTaxonomy("wallet");
      dispatch(actionSetAssetWallets(assets));
      setValue("thumbnail", assets[0].source);
      setAssetSelect(assets[0]);
    };
    if (!assetWallets.at(0)) {
      fetchAssetWallet();
    } else {
      setValue("thumbnail", assetWallets[0].source);
      setAssetSelect(assetWallets[0]);
    }
  }, []);
  //Function handler
  const handlerSave = async (data: any) => {
    setLoadingSubmit(() => true);
    try {
      const walletNew = await apiCreateWallet({
        name: data.name,
        description: data.description,
        balance: Number(data.balance),
        thumbnail: data.thumbnail,
      });
      dispatch(actionAddWalletResources(walletNew));
      reset();
      return navigation.goBack();
    } finally {
      setLoadingSubmit(() => false);
    }
  };
  const handlerSelectThumbnail = (asset: AssetInfo) => {
    setValue("thumbnail", asset.source);
    setAssetSelect(asset);
  };

  return (
    <>
      <Stack style={{ height: 100 }} bg="sky500" justify="flex-end">
        <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconChevronLeft color="white" />
          </TouchableOpacity>
          <TextUI fw="bold" size="xl" color="white">
            Add Wallet
          </TextUI>
          <View></View>
        </Group>
      </Stack>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ paddingTop: 16, backgroundColor: "#fff" }}>
        <Stack spacing={30} style={[sx.pxMd]}>
          <Stack align="center" justify="center" bg="white" spacing={8}></Stack>
          <Stack>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(event) => onChange(event.nativeEvent.text)}
                  value={value}
                  status="info"
                  label="Wallet Name"
                  placeholder="Enter name"
                />
              )}
            />
            <Controller
              control={control}
              name="balance"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(event) => onChange(event.nativeEvent.text)}
                  value={value}
                  status="info"
                  size="large"
                  label="Initial Balance"
                  placeholder="Enter Amount"
                  keyboardType="decimal-pad"
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(event) => onChange(event.nativeEvent.text)}
                  value={value}
                  status="info"
                  label="Description"
                  placeholder="Enter description"
                  numberOfLines={4}
                  maxLength={40}
                  editable
                  multiline
                />
              )}
            />
            <Stack>
              <TextUI fw="bold" size="sm" color="stone500">
                Thumbnail
              </TextUI>
              <Group position="center">
                {assetWallets.map((asset) => (
                  <TouchableOpacity key={asset.assetId} onPress={() => handlerSelectThumbnail(asset)}>
                    <Image
                      style={{
                        borderRadius: 10,
                        borderColor: colors.sky500,
                        opacity: asset.assetId === assetSelect?.assetId ? 1 : 0.4,
                        borderWidth: asset.assetId === assetSelect?.assetId ? 2 : 0,
                      }}
                      height={60}
                      width={100}
                      alt={asset.assetId}
                      source={{
                        uri: mapUrlAsset(asset.source),
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </Group>
            </Stack>
          </Stack>
          <ButtonUI size="md" radius="xl" loading={loadingSubmit} color="sky" onPress={handleSubmit(handlerSave)}>
            Save
          </ButtonUI>
        </Stack>
      </ScrollView>
    </>
  );
}

export default AddWalletScreen;
