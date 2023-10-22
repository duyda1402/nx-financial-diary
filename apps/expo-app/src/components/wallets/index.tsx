import React from "react";
import { FlatList, ImageBackground, SafeAreaView, View } from "react-native";
import { ButtonUI, Group, IconPlus, Stack, TextUI } from "../atom";
import Carousel from "react-native-snap-carousel";
import { colors, sx } from "@nfd/styles";
import { formatNumberWithCommas } from "../../utils";
type Props = {};

const Wallets = (props: Props) => {
  const carouselItems = [
    {
      title: "My Wallet 1",
      balance: 12000,
      uri: "https://images.unsplash.com/photo-1600627255439-a41d2a40b3da?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "My Wallet 2",
      balance: 50000,
      uri: "https://images.unsplash.com/photo-1600673645627-1c47394132ac?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "My Wallet 3",
      balance: 18000,
      uri: "https://images.unsplash.com/photo-1556139930-c23fa4a4f934?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <SafeAreaView style={{ backgroundColor: colors.gray100 }}>
      <Carousel
        layout={"default"}
        data={carouselItems}
        sliderWidth={400}
        itemWidth={300}
        renderItem={({ item }) => (
          <ImageBackground
            imageStyle={{ borderRadius: 12, opacity: 0.6 }}
            style={{ backgroundColor: "rgba(0, 0, 0, 1)", borderRadius: 12 }}
            source={{
              uri: item.uri,
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
                {item.title}
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
