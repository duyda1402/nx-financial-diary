import React from "react";
import { ColorValue } from "react-native";
import { SvgXml } from "react-native-svg";

type Props = {
  size?: number;
  strokeWidth?: number;
  color?: ColorValue;
};

function IconTrash({ size = 24, strokeWidth = 2, color = "#1f2937" }: Props) {
  const data = `<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>`;
  return <SvgXml xml={data} width={size} height={size} strokeWidth={strokeWidth} stroke={color} />;
}

export default IconTrash;
