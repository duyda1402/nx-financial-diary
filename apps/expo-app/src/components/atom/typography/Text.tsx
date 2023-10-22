import React from "react";
import { ColorKeys, colors, sx } from "@nfd/styles";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface TextUIProps extends TextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  size?: number | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  color?: ColorKeys;
  fw?: "thin" | "light" | "normal" | "medium" | "extra-light" | "bold" | "semi-bold" | "extra-bold" | "black";
  ta?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  fs?: "normal" | "italic" | undefined;
  td?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
  tt?: "none" | "capitalize" | "uppercase" | "lowercase" | undefined;
  lineClamp?: number | undefined;
}

function TextUI({
  children,
  style,
  size = "md",
  fw = "normal",
  color = "gray900",
  ta,
  fs,
  td,
  tt,
  lineClamp,
  ...props
}: TextUIProps) {
  const fontSizes = {
    xs: sx.textXs,
    sm: sx.textSm,
    md: sx.textBase,
    lg: sx.textLg,
    xl: sx.textXl,
    "2xl": sx.text2Xl,
    "3xl": sx.text3Xl,
    "4xl": sx.text4Xl,
    [`&:${size}`]: {
      fontSize: size as number,
    },
  };
  const fontWeight = {
    thin: sx.fontThin,
    light: sx.fontLight,
    normal: sx.fontNormal,
    medium: sx.fontMedium,
    "extra-light": sx.fontExtraLight,
    bold: sx.fontBold,
    "semi-bold": sx.fontSemiBold,
    "extra-bold": sx.fontExtraBold,
    black: sx.fontBlack,
  };
  return (
    <Text
      {...props}
      numberOfLines={lineClamp}
      style={[
        style,
        fontSizes[typeof size === "number" ? `&:${size}` : size],
        fontWeight[fw],
        { textAlign: ta, textDecorationLine: td, textTransform: tt, fontStyle: fs, color: colors[color] },
      ]}
    >
      {children}
    </Text>
  );
}

export default TextUI;
