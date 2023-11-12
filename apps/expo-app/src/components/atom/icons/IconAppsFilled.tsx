import React from "react";
import { ColorValue } from "react-native";
import { Svg, Path } from "react-native-svg";

type Props = {
  size?: number;
  strokeWidth?: number;
  color?: ColorValue;
};

function IconAppsFilled({ size = 24, strokeWidth = 2, color = "#1f2937" }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width={strokeWidth}
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
      <Path
        d="M9 3h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z"
        stroke-width="0"
        fill={color}
      ></Path>
      <Path
        d="M9 13h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z"
        stroke-width="0"
        fill={color}
      ></Path>
      <Path
        d="M19 13h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z"
        stroke-width="0"
        fill={color}
      ></Path>
      <Path
        d="M17 3a1 1 0 0 1 .993 .883l.007 .117v2h2a1 1 0 0 1 .117 1.993l-.117 .007h-2v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2h-2a1 1 0 0 1 -.117 -1.993l.117 -.007h2v-2a1 1 0 0 1 1 -1z"
        stroke-width="0"
        fill={color}
      ></Path>
    </Svg>
  );
}

export default IconAppsFilled;
