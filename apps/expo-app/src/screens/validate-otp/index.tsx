import { colors, sx } from "@nfd/styles";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { ScreenName } from "../../common/enum";

import { ButtonUI, Container, Group, OtpInput, Stack, TextUI } from "../../components/atom";
import BranchApp from "../../components/logo";

export interface LoginScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function ValidateOtpScreen({ navigation }: LoginScreenProps) {
  // console.log(ValidateOtpScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [ttl, setTtl] = useState<number>(300);
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
    setLoadingSubmit(() => false);
    redirectToHome();
  };

  //Effect Init
  useEffect(() => {
    const interval = setTimeout(() => {
      if (ttl > 0) {
        setTtl(ttl - 1);
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, [ttl]);

  return (
    <Container style={[sx.pxMd]} keyboardHeight={keyboardHeight}>
      <Stack justify="space-between" style={sx.hFull}>
        <Stack style={sx.mtXl}>
          <BranchApp position="center" />
          <Stack style={sx.mtXl}>
            <TextUI fw="bold" size="4xl" ta="center">
              Sign in
            </TextUI>
            <Stack spacing="sm">
              <TextUI>Enter OTP:</TextUI>
              <OtpInput name="otp" control={control} required noWrap />
              <Group position="center" spacing="xs">
                <TextUI color="gray500" style={sx.mtSm}>
                  Re-send the OTP code in
                </TextUI>
                <TextUI fw="bold">{ttl}s</TextUI>
              </Group>
            </Stack>
          </Stack>
        </Stack>
        <ButtonUI
          size="lg"
          color="orange"
          variant="filled"
          radius="xl"
          onPress={handleSubmit(onSubmit)}
          loading={loadingSubmit}
        >
          Continue
        </ButtonUI>
      </Stack>
    </Container>
  );
}

export default ValidateOtpScreen;
