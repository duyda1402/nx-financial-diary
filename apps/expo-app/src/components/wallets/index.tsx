import React from "react";
import { ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatNumberWithCommas, mapUrlAsset } from "../../utils";
import { Stack, TextUI } from "../atom";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../common/enum";
import { actionSelectWallet } from "../../store/feature/selector";
import { WalletInfo } from "../../common/types/wallet.type";
type Props = {};

const Wallets = (props: Props) => {
  const navigation = useNavigation();
  const wallets = useSelector((state: RootState) => state.resources.wallets);
  const dispatch = useDispatch();
  const handlerWallet = (wallet: WalletInfo) => {
    dispatch(actionSelectWallet(wallet));
    return navigation.navigate(ScreenName.WALLET_DETAILS as never);
  };

  return (
    <SafeAreaView>
      <Carousel
        layout={"default"}
        data={wallets}
        sliderWidth={400}
        itemWidth={300}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.walletId} onPress={() => handlerWallet(item)}>
            <ImageBackground
              imageStyle={{ borderRadius: 12, opacity: 0.9 }}
              style={{ backgroundColor: "rgba(0, 0, 0, 1)", borderRadius: 12 }}
              source={{
                uri: `${mapUrlAsset(item?.thumbnail || "")}`,
              }}
              resizeMode="cover"
            >
              <Stack
                justify="flex-end"
                spacing={8}
                style={{
                  padding: 12,
                  width: 300,
                  height: 140,
                }}
              >
                <TextUI color="white" size="xl" fw="bold">
                  {item?.name}
                </TextUI>
                <TextUI color="white" size="3xl" fw="extra-bold">
                  {formatNumberWithCommas(item?.balance || 0)}
                </TextUI>
              </Stack>
            </ImageBackground>
          </TouchableOpacity>
        )}
        // onSnapToItem={(index) => console.log(index, { activeIndex: index })}
      />
    </SafeAreaView>
  );
};

export default Wallets;
