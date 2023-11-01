import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, SafeAreaView, View } from "react-native";
import { ButtonUI, Group, IconPlus, Stack, TextUI } from "../atom";
import Carousel from "react-native-snap-carousel";
import { colors, sx } from "@nfd/styles";
import { formatNumberWithCommas } from "../../utils";
import { apiWalletByUser } from "../../api/wallet.api";
import { WalletInfo } from "../../common/types/wallet.type";
type Props = {};

const Wallets = (props: Props) => {
  const [wallets, setWallets] = useState<Array<WalletInfo>>([]);
  useEffect(() => {
    const fetchWallets = async () => {
      const wallets = await apiWalletByUser();
      setWallets(wallets);
    };
    fetchWallets();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: colors.gray100 }}>
      <Carousel
        layout={"default"}
        data={wallets}
        sliderWidth={400}
        itemWidth={300}
        renderItem={({ item }) => (
          <ImageBackground
            imageStyle={{ borderRadius: 12, opacity: 0.9 }}
            style={{ backgroundColor: "rgba(0, 0, 0, 1)", borderRadius: 12 }}
            source={{
              uri: `${item?.thumbnail}`,
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
              <TextUI color="white" size="md" fw="bold">
                {item?.name}
              </TextUI>
              <TextUI color="white" size="2xl" fw="extra-bold">
                ${formatNumberWithCommas(item?.balance || 0)}
              </TextUI>
            </Stack>
          </ImageBackground>
        )}
        onSnapToItem={(index) => console.log(index, { activeIndex: index })}
      />
    </SafeAreaView>
  );
};

export default Wallets;
