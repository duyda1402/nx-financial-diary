import { colors, sx } from "@nfd/styles";
import { Button, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";
import { ScreenName } from "../../common/enum";

import { LOGO_URL } from "../../common";
import Stack from "../../components/layout/Stack";

export interface WelcomeScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  console.log(WelcomeScreen.name);
  // State Init
  const window = Dimensions.get("window");
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  //Callback Init
  const redirectToSignIn = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
  }, [navigation]);

  //Effect Init
  useEffect(() => {
    // console.log(domiCore.session.get());
    // if (!domiCore.session.isAuthFlowCompleted()) {
    //   return redirectToSignIn();
    // }
  }, []);

  return (
    <Stack style={[{ height: window.height, backgroundColor: colors.white }, sx.pMd]} justify="space-between">
      <Stack align="center" style={[sx.mtXl]}>
        <Image style={{ height: 80, width: 80 }} source={{ uri: LOGO_URL }} />
        <Text style={[sx.textLg, sx.textSemiBold]}>Welcome</Text>
      </Stack>

      <Stack>
        <Button status="info" onPress={redirectToSignIn}>
          Login
        </Button>
      </Stack>
    </Stack>
  );
}

export default WelcomeScreen;
