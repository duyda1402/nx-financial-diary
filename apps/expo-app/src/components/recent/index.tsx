import React from "react";
import { Group, Stack, TextUI } from "../atom";
import { sx } from "@nfd/styles";
import { Image } from "react-native";

type Props = {};

function RecentTransition({}: Props) {
  return (
    <Stack style={[sx.pxMd]} spacing="sm">
      {new Array(6).fill(0).map((_, index) => (
        <Group
          style={[{ width: "100%", borderRadius: 16 }, sx.pxMd, sx.pySm]}
          bg="white"
          align="center"
          position="between"
          noWrap
          key={index}
        >
          <Group align="center" noWrap>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/11661/11661645.png" }}
              style={{ height: 40, width: 40 }}
            />
            <Stack spacing={0}>
              <TextUI fw="bold" size="lg" lineClamp={1}>
                Food & Beverage
              </TextUI>
              <TextUI size="sm" color="gray400">
                Today - 02.34 pm
              </TextUI>
            </Stack>
          </Group>
          <TextUI fw="bold" size="lg" color={index % 2 ? "rose500" : "green500"}>
            {index % 2 ? "- $15.00" : "+ $20.00"}
          </TextUI>
        </Group>
      ))}
    </Stack>
  );
}

export default RecentTransition;
