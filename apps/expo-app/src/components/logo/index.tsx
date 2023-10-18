import React from "react";
import Group from "../layout/Group";
import { Image } from "react-native";
import { LOGO_URL } from "../../common";
import { Text } from "@ui-kitten/components";
import { colors, sx } from "@nfd/styles";
type Props = {
  position?: "center" | "right" | "left";
};

function BranchApp({ position }: Props) {
  return (
    <Group align="center" position={position} spacing="xs">
      <Image style={{ height: 40, width: 40 }} source={{ uri: LOGO_URL }} />
      <Text style={[sx.text2Xl, sx.fontBold, { color: colors.orange500 }]}>Financial Diary</Text>
    </Group>
  );
}

export default BranchApp;
