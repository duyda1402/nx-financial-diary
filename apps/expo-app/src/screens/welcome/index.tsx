import { sx } from "@nfd/styles";
import { Button, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import { ScreenName } from "../../common/enum";

import { LOGO_URL } from "../../common";
import { Container, Stack } from "../../components/atom";

export interface WelcomeScreenProps {
  navigation?: any;
}

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  // State Init

  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  //Callback Init
  const redirectToSignIn = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
  }, [navigation]);

  //Effect Init
  useEffect(() => {}, []);

  return (
    <Container style={[sx.pxMd]}>
      <Stack justify="space-between" style={sx.hFull}>
        <Stack align="center" style={[sx.mtXl]}>
          <Image style={{ height: 80, width: 80 }} source={{ uri: LOGO_URL }} />
          <Text style={[sx.textLg, sx.fontBold]}>Welcome</Text>
        </Stack>

        <Stack>
          <Button status="info" onPress={redirectToSignIn}>
            Login
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default WelcomeScreen;
