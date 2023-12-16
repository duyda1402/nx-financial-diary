import { colors, sx } from "@nfd/styles";
import { Input } from "@ui-kitten/components";
import { ButtonUI, Group, Stack, TextUI } from "apps/expo-app/src/components/atom";
import { RootState } from "apps/expo-app/src/store";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconChevronLeft from "../../components/atom/icons/IconChevronLeft";
import { useCallback, useEffect, useState } from "react";
import { apiGetAssetByTaxonomy } from "../../api/asset.api";
import { actionSetAssetWallets } from "../../store/feature/asset";
import { AssetInfo } from "../../common/types/asset.types";
import { mapUrlAsset, reloadFullData } from "../../utils";
import { apiDeleteWallet, apiUpdateWallet } from "../../api/wallet.api";
import { ScreenName } from "../../common/enum";

export interface SettingTabProps {
  navigation?: any;
}

function EditWalletScreen({ navigation }: SettingTabProps) {
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const wallet = useSelector((state: RootState) => state.selector.wallet);
  // Store Init
  const assetWallets = useSelector((state: RootState) => state.asset.wallets);
  const [assetSelect, setAssetSelect] = useState<AssetInfo | null>(null);

  const dispatch = useDispatch();
  // Form Init
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      balance: `${wallet?.balance}`,
      description: wallet?.description || "",
      name: wallet?.name || "",
      thumbnail: "",
    },
  });

  useEffect(() => {
    const fetchAssetWallet = async () => {
      const assets = await apiGetAssetByTaxonomy("wallet");
      dispatch(actionSetAssetWallets(assets));
      const asset = assets.find((asset) => asset.source === wallet?.thumbnail) || null;
      setValue("thumbnail", `${asset?.source}`);
      setAssetSelect(asset);
    };
    if (!assetWallets.at(0)) {
      fetchAssetWallet();
    } else {
      const asset = assetWallets.find((asset) => asset.source === wallet?.thumbnail) || null;
      setValue("thumbnail", `${asset?.source}`);
      setAssetSelect(asset);
    }
  }, []);

  const redirectToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.HOME_SCREEN }],
    });
  }, [navigation]);
  //Function handler
  const handlerSave = async (data: any) => {
    setLoadingSubmit(() => true);
    try {
      await apiUpdateWallet(`${wallet?.walletId}`, {
        name: data.name,
        description: data.description,
        balance: Number(data.balance),
        thumbnail: data.thumbnail,
      });

      reloadFullData(dispatch);
      return Alert.alert("Success", "Update wallet successfully!", [{ text: "OK", onPress: () => redirectToHome() }]);
    } finally {
      setLoadingSubmit(() => false);
    }
  };

  const handlerSelectThumbnail = (asset: AssetInfo) => {
    setValue("thumbnail", asset.source);
    setAssetSelect(asset);
  };

  const onDelete = async () => {
    setLoadingSubmit(() => true);
    try {
      await apiDeleteWallet(`${wallet?.walletId}`);
      reloadFullData(dispatch);
      Alert.alert("Success", "Delete wallet successfully!", [{ text: "OK", onPress: () => redirectToHome() }]);
    } catch (err: any) {
      Alert.alert("Error: " + err.message);
    } finally {
      setLoadingSubmit(() => false);
    }
  };

  return (
    <>
      <Stack style={{ height: 100 }} bg="sky500" justify="flex-end">
        <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconChevronLeft color="white" />
          </TouchableOpacity>
          <TextUI fw="bold" size="xl" color="white">
            {wallet?.name}
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
                        opacity: asset.id === assetSelect?.id ? 1 : 0.4,
                        borderWidth: asset.id === assetSelect?.id ? 2 : 0,
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

          <Stack>
            <ButtonUI size="md" radius="xl" loading={loadingSubmit} color="sky" onPress={handleSubmit(handlerSave)}>
              Save
            </ButtonUI>
            <ButtonUI size="md" radius="xl" loading={loadingSubmit} color="rose" variant="subtle" onPress={onDelete}>
              Delete
            </ButtonUI>
          </Stack>
        </Stack>
      </ScrollView>
    </>
  );
}

export default EditWalletScreen;
