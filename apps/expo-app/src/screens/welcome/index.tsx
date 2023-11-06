import { useCallback, useEffect } from "react";
import { Dimensions, Image } from "react-native";
import { ScreenName } from "../../common/enum";
import { ButtonUI, Stack, TextUI } from "../../components/atom";
import { apiGetMe } from "../../api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_ACCESS_TOKEN } from "../../common";

export interface WelcomeScreenProps {
  navigation?: any;
}

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  // State Init
  const window = Dimensions.get("window");

  //Callback Init
  const redirectToSignIn = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.HOME_SCREEN }],
    });
  }, [navigation]);

  //Effect Init
  useEffect(() => {
    const fetchAuth = async () => {
      const tokens = await AsyncStorage.getItem(KEY_ACCESS_TOKEN);
      if (!!tokens) {
        try {
          const resMe = await apiGetMe();
          if (resMe.code === 200) {
            return redirectToHome();
          }
        } catch (err: any) {
          console.log(err.message);
        }
      }
    };
    fetchAuth();
  }, []);

  return (
    <Stack
      style={{ paddingTop: 40, paddingBottom: 60, padding: 20, height: window.height }}
      justify="space-between"
      bg="slate50"
    >
      <Stack align="center">
        <Image
          source={require("../../../assets/iw2.png")}
          style={{
            marginTop: 100,
            width: 300,
            height: 280,
            resizeMode: "contain",
          }}
        />
        <TextUI fw="semi-bold" size="2xl" color="gray600">
          Let's get started
        </TextUI>
        <TextUI color="gray400" ta="center" style={{ width: 300 }}>
          Never a better time than now to start thinking about how you manage all your finances with ease.
        </TextUI>
      </Stack>
      <ButtonUI size="lg" radius="xl" color="sky" onPress={redirectToSignIn}>
        Getting started
      </ButtonUI>
    </Stack>
  );
}

export default WelcomeScreen;
