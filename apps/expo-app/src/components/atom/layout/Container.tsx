import { ColorKeys, colors } from "@nfd/styles";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleProp, ViewStyle } from "react-native";

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
  const styles = [style, { height: screen, backgroundColor: bg ? colors[bg] : undefined }] as StyleProp<ViewStyle>;

  return (
    <ScrollView style={styles} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
};

export default Container;
