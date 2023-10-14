import { sx } from "@nfd/styles";
import { Spinner } from "@ui-kitten/components";
import { ImageStyle, StyleProp, View } from "react-native";

interface LoadingIndicatorProps {
  size?: "tiny" | "large" | "small" | "medium" | "giant";
  style?: StyleProp<ImageStyle>;
}
const LoadingIndicator = ({ size = "small", style = {} }: LoadingIndicatorProps): React.ReactElement => (
  <View style={[style, sx.indicator]}>
    <Spinner size={size} />
  </View>
);

export default LoadingIndicator;
