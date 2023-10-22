import { ColorKeys, PositionType, SizeBase, colors, sx, DomiTheme } from "@nfd/styles";
import { FlexAlignType, StyleProp, View, ViewStyle } from "react-native";

interface GroupProps {
  position?: PositionType;
  style?: StyleProp<ViewStyle>;
  align?: FlexAlignType;
  spacing?: SizeBase;
  children?: any;
  noWrap?: boolean;
  bg?: ColorKeys;
}
const Group = ({
  noWrap = false,
  spacing,
  position,
  align = "baseline",
  style,
  children,
  bg,
}: GroupProps): React.ReactElement => {
  const theme = new DomiTheme();

  return (
    <View
      style={[
        style,
        { flexWrap: noWrap ? "nowrap" : "wrap" },
        { justifyContent: theme.justify(position) },
        {
          alignItems: align,
          backgroundColor: bg ? colors[bg] : undefined,
          gap: theme.spacings(spacing),
        },
        sx.flexRow,
      ]}
    >
      {children}
    </View>
  );
};

export default Group;
