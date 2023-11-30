import { AvatarUI, Group, Stack, TextUI } from "apps/expo-app/src/components/atom";
import { RootState } from "apps/expo-app/src/store";
import { formatNumberWithCommas, mapUrlAsset } from "apps/expo-app/src/utils";
import { View, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
        <Stack style={[sx.mtMd, sx.pxMd]} spacing="md">
          {wallets.at(0) ? (
            <>
              {wallets.map((wallet) => (
                <TouchableOpacity key={wallet.id} onPress={() => handlerSelect(wallet)}>
                  <ImageBackground
                    style={{ backgroundColor: "rgba(0, 0, 0, 1)", borderRadius: 12 }}
                    imageStyle={{ borderRadius: 12, opacity: 0.9 }}
                    source={{ uri: mapUrlAsset(wallet?.thumbnail) }}
                  >
                    <Group noWrap align="center" position="between" style={[sx.pMd]}>
                      <Group align="center" noWrap>
                        <View>
                          <TextUI fw="bold" size="lg" color="white" lineClamp={1}>
                            {wallet.name}
                          </TextUI>
                          <TextUI color="white" size={24} fw="extra-bold" lineClamp={1}>
                            {formatNumberWithCommas(wallet.balance)}
                          </TextUI>
                        </View>
                      </Group>
                      {wallet.walletId === walletSelected?.walletId && (
                        <Image
                          source={require("../../../assets/icons/checked.png")}
                          style={{
                            width: 30,
                            height: 30,
                            resizeMode: "contain",
                          }}
                          alt="checked"
                        />
                      )}
                    </Group>
                  </ImageBackground>
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
