import { sx } from "@nfd/styles";

import { FlexAlignType, StyleProp, View, ViewStyle, FlexStyle } from "react-native";

interface LoadingIndicatorProps {
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | undefined;
  style?: StyleProp<ViewStyle>;
  align?: FlexAlignType;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  children?: any;
  noWrap?: boolean;
}
const Stack = ({
  spacing = "md",
  justify = "center",
  align = "stretch",
  style = {},
  children,
}: LoadingIndicatorProps): React.ReactElement => {
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
    { alignItems: align, justifyContent: justify },
    sx.flexCol,
    sOpts[typeof spacing === "number" ? `&:${spacing}` : spacing],
  ] as StyleProp<ViewStyle>;

  return <View style={styles}>{children}</View>;
};

export default Stack;
