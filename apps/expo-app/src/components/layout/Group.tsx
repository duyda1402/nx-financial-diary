import { sx } from "@nfd/styles";

import { FlexAlignType, StyleProp, View, ViewStyle } from "react-native";

interface LoadingIndicatorProps {
  position?: "center" | "right" | "between" | "left";
  style?: StyleProp<ViewStyle>;
  align?: FlexAlignType;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  children?: any;
  noWrap?: boolean;
}
const Group = ({
  noWrap = false,
  spacing = "md",
  position = "left",
  align = "baseline",
  style = {},
  children,
}: LoadingIndicatorProps): React.ReactElement => {
  const pOpts = {
    center: sx.justifyCenter,
    right: sx.justifyEnd,
    between: sx.justifyBetween,
    left: sx.justifyStart,
  };

  const sOpts = {
    xs: sx.gapXs,
    sm: sx.gapSm,
    md: sx.gapMd,
    lg: sx.gapLg,
    xl: sx.gapXl,
    [`&:${spacing}`]: { gap: spacing as number },
  };

  const styles = [
    style,
    { flexWrap: noWrap ? "nowrap" : "wrap" },
    { alignItems: align },
    sx.flexRow,
    sx.wFull,
    pOpts[position],
    sOpts[typeof spacing === "number" ? `&:${spacing}` : spacing],
  ] as StyleProp<ViewStyle>;

  return <View style={styles}>{children}</View>;
};

export default Group;
