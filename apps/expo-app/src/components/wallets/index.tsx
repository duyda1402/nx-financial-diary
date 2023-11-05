import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatNumberWithCommas, mapUrlAsset } from "../../utils";
import { Stack, TextUI } from "../atom";
type Props = {};

const Wallets = (props: Props) => {
  const wallets = useSelector((state: RootState) => state.resources.wallets);

  return (
    <SafeAreaView>
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
        )}
        onSnapToItem={(index) => console.log(index, { activeIndex: index })}
      />
    </SafeAreaView>
  );
};

export default Wallets;
