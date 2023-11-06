import { AvatarUI, Group, Stack, TextUI } from "apps/expo-app/src/components/atom";
import { RootState } from "apps/expo-app/src/store";
import { formatNumberWithCommas, mapUrlAsset } from "apps/expo-app/src/utils";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ICON_CHECK } from "../../common";
import { sx } from "@nfd/styles";
import { actionSelectWallet } from "../../store/feature/selector";
import { WalletInfo } from "../../common/types/wallet.type";
import IconChevronLeft from "../../components/atom/icons/IconChevronLeft";

export interface SettingTabProps {
  navigation?: any;
}

function SelectWalletScreen({ navigation }: SettingTabProps) {
  // State Init
  const wallets = useSelector((state: RootState) => state.resources.wallets);
  const walletSelected = useSelector((state: RootState) => state.selector.wallet);
  const dispatch = useDispatch();

  const handlerSelect = (wallet: WalletInfo) => {
    dispatch(actionSelectWallet(wallet));
    return navigation.goBack();
  };

  return (
    <>
      <Stack style={{ height: 100 }} bg="sky500" justify="flex-end">
        <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconChevronLeft color="white" />
          </TouchableOpacity>
          <TextUI fw="bold" size="xl" color="white">
            Select Wallet
          </TextUI>
          <View></View>
        </Group>
      </Stack>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Stack style={[sx.mtMd]} spacing="xs">
          {wallets.at(0) ? (
            <>
              {wallets.map((wallet) => (
                <TouchableOpacity key={wallet.id} onPress={() => handlerSelect(wallet)}>
                  <Group noWrap align="center" position="between" bg="white" style={[sx.pMd]}>
                    <Group align="center" noWrap>
                      <AvatarUI radius="full" uri={mapUrlAsset(wallet?.thumbnail)} />
                      <View>
                        <TextUI fw="semi-bold" size="md" lineClamp={1}>
                          {wallet.name}
                        </TextUI>
                        <TextUI color="gray500" size="sm" lineClamp={1}>
                          {formatNumberWithCommas(wallet.balance)}
                        </TextUI>
                      </View>
                    </Group>
                    {wallet.walletId === walletSelected?.walletId && (
                      <Image source={{ uri: ICON_CHECK }} height={30} width={30} alt="checked" />
                    )}
                  </Group>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <TextUI color="gray600" size="xs">
              You not have nay record
            </TextUI>
          )}
        </Stack>
      </ScrollView>
    </>
  );
}

export default SelectWalletScreen;
