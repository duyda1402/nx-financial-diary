import { colors, sx } from "@nfd/styles";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { ScreenName } from "../../common/enum";
import { ButtonUI, Container, EmailInput, IconUserCircle, Stack, TextUI } from "../../components/atom";
import BranchApp from "../../components/logo";

export interface LoginScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function LoginScreen({ navigation }: LoginScreenProps) {
  console.log(LoginScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

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

  const redirectToNewUser = useCallback(() => {
    navigation.navigate(ScreenName.CREATE_ACCOUNT_SCREEN, { replace: true });
  }, [navigation]);

  const onSubmit = (data: any) => {
    setLoadingSubmit(() => true);
    setTimeout(() => {
      setLoadingSubmit(() => false);
      redirectToNewUser();
    }, 2000);
  };
  //Effect Init
  useEffect(() => {}, []);

  return (
    <Container style={[sx.pxMd]} keyboardHeight={keyboardHeight}>
      <Stack style={{ height: "100%" }} justify="space-between">
        <Stack style={sx.mtXl}>
          <BranchApp position="center" />
          <Stack style={sx.mtXl}>
            <TextUI fw="bold" size="4xl" ta="center">
              Sign in or sign up
            </TextUI>
            <Stack spacing="sm">
              <TextUI>Your email!</TextUI>
              <EmailInput name="email" control={control} required />
            </Stack>
          </Stack>
        </Stack>

        <ButtonUI
          color="orange"
          variant="filled"
          radius="xl"
          size="lg"
          onPress={handleSubmit(onSubmit)}
          loading={loadingSubmit}
        >
          Continue
        </ButtonUI>
      </Stack>
    </Container>
  );
}

export default LoginScreen;
