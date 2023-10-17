import { colors, sx } from "@nfd/styles";
import { Button, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { ScreenName } from "../../common/enum";
import OtpInput from "../../components/input-ui/OtpInput";
import Container from "../../components/layout/Container";
import Group from "../../components/layout/Group";
import Stack from "../../components/layout/Stack";
import LoadingIndicator from "../../components/loader/LoaderIndicator";

export interface LoginScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function ValidateOtpScreen({ navigation }: LoginScreenProps) {
  console.log(ValidateOtpScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  // FE SDK Init
  // const domiCore = useMemo(() => new DomiCore(API_URL), []);
  //Keyboard Init
  Keyboard.addListener("keyboardDidShow", (event) => {
    const keyboardHeight = event.endCoordinates.height;
    setKeyboardHeight(keyboardHeight);
  });

  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardHeight(0);
  });
  // Form Init
  const { control, handleSubmit } = useForm();
  //Callback Init
  const redirectToHome = useCallback(() => {
    navigation.navigate(ScreenName.HOME_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToNewUser = useCallback(() => {
    navigation.navigate(ScreenName.CREATE_ACCOUNT_SCREEN, { replace: true });
  }, [navigation]);

  const onSubmit = (data: any) => {
    setLoadingSubmit(() => true);
    console.log("OTP", data?.otp);
    setLoadingSubmit(() => false);
    redirectToHome();
  };

  //Effect Init
  useEffect(() => {}, []);

  return (
    <Container style={[sx.pxMd]} keyboardHeight={keyboardHeight}>
      <Stack justify="space-between" style={sx.hFull}>
        <Stack style={[sx.mtXl]}>
          <Group position="center">
            <Text style={[sx.textXl, sx.fontBold]}>Sign in</Text>
          </Group>
          <Stack spacing="sm">
            <Text>Enter OTP:</Text>
            <OtpInput name="otp" control={control} required noWrap />
            <Group position="center" spacing="xs">
              <Text style={[{ color: colors.gray500 }, sx.mtSm]}>Resend the OTP code in</Text>
              <Text style={[sx.fontBold]}>150s</Text>
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
    </Container>
  );
}

export default ValidateOtpScreen;
