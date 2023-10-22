import { ColorKeys, colors } from "@nfd/styles";
import { useEffect, useState } from "react";
import { Dimensions, StyleProp, View, ViewStyle } from "react-native";

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children?: any;
  keyboardHeight?: number;
  bg?: ColorKeys;
}
const Container = ({ style = {}, children, keyboardHeight = 0, bg }: ContainerProps): React.ReactElement => {
  const window = Dimensions.get("window");
  const [screen, setScreen] = useState<number>(window.height);

  useEffect(() => {
    setScreen(window.height - keyboardHeight);
  }, [keyboardHeight]);
  const styles = [
    style,
    { paddingTop: 32, paddingBottom: 20, height: screen, backgroundColor: bg ? colors[bg] : undefined },
  ] as StyleProp<ViewStyle>;

  return <View style={styles}>{children}</View>;
};

export default Container;
