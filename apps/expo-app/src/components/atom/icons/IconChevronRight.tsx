import React from "react";
import { ColorValue } from "react-native";
import { SvgXml } from "react-native-svg";

type Props = {
  size?: number;

  strokeWidth?: number;
  color?: ColorValue;
};

function IconChevronRight({ size = 24, strokeWidth = 2, color = "#1f2937" }: Props) {
  const data = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M9 6l6 6l-6 6"></path>
</svg>`;
  return <SvgXml xml={data} width={size} height={size} strokeWidth={strokeWidth} stroke={color} />;
}

export default IconChevronRight;
