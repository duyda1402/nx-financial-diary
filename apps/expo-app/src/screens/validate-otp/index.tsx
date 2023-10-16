import { colors, sx } from "@nfd/styles";
import { Button, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { ScreenName } from "../../common/enum";
import Group from "../../components/layout/Group";
import Stack from "../../components/layout/Stack";
import LoadingIndicator from "../../components/loader/LoaderIndicator";
import { Dimensions, Keyboard } from "react-native";
import OtpInput from "../../components/input-ui/OtpInput";

export interface LoginScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function ValidateOtpScreen({ navigation }: LoginScreenProps) {
  console.log(ValidateOtpScreen.name);
  // State Init
  const window = Dimensions.get("window");
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [heightScreen, setHeightScree] = useState<number>(window.height);

  // FE SDK Init
  // const domiCore = useMemo(() => new DomiCore(API_URL), []);
  //Keyboard Init
  Keyboard.addListener("keyboardDidShow", (event) => {
    const keyboardHeight = event.endCoordinates.height;
    setHeightScree(window.height - keyboardHeight);
  });

  Keyboard.addListener("keyboardDidHide", () => {
    setHeightScree(window.height);
  });
  // Form Init
  const { control, handleSubmit } = useForm();
  //Callback Init
  const redirectToHome = useCallback(() => {
    navigation.navigate(ScreenName.WELCOME_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToNewUser = useCallback(() => {
    navigation.navigate(ScreenName.NEW_USER_SCREEN, { replace: true });
  }, [navigation]);

  const onSubmit = (data: any) => {
    setLoadingSubmit(() => true);
    console.log("OTP", data?.otp);
    setLoadingSubmit(() => false);
    redirectToNewUser();
  };

  //Effect Init
  useEffect(() => {}, []);

  return (
    <Stack style={[{ height: heightScreen, backgroundColor: colors.white }, sx.pxMd, sx.pyXl]} justify="space-between">
      <Stack style={[sx.mtXl]}>
        <Group position="center">
          <Text style={[sx.textLg, sx.textSemiBold]}>Sign in</Text>
        </Group>
        <Stack spacing="sm">
          <Text>Enter OTP:</Text>
          <OtpInput name="otp" control={control} required />
          <Group position="center" spacing="xs">
            <Text style={[{ color: colors.gray500 }, sx.mtSm]}>Resend the OTP code in</Text>
            <Text style={[sx.textSemiBold]}>150s</Text>
          </Group>
        </Stack>
      </Stack>
      {loadingSubmit ? (
        <Button status="info" accessoryLeft={() => <LoadingIndicator />}>
          Continue
        </Button>
      ) : (
        <Button status="info" onPress={handleSubmit(onSubmit)}>
          Continue
        </Button>
      )}
    </Stack>
  );
}

export default ValidateOtpScreen;
