import { ColorKeys, JustifyType, SizeBase, colors, sx, DomiTheme } from "@nfd/styles";
import { FlexAlignType, StyleProp, View, ViewStyle } from "react-native";

interface StackProps {
  justify?: JustifyType;
  style?: StyleProp<ViewStyle>;
  align?: FlexAlignType;
  spacing?: SizeBase;
  children?: any;
  noWrap?: boolean;
  bg?: ColorKeys;
}
const Stack = ({ spacing, justify, align = "stretch", style, children, bg }: StackProps): React.ReactElement => {
  const theme = new DomiTheme();
  return (
    <View
      style={[
        style,
        {
          alignItems: align,
          justifyContent: justify,
          backgroundColor: bg ? colors[bg] : undefined,
          gap: theme.spacings(spacing),
        },
        sx.flexCol,
      ]}
    >
      {children}
    </View>
  );
};

export default Stack;
