import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Image, Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { apiFetchUserByEmail, apiLoginInitialize } from "../../api/auth.api";
import { ScreenName } from "../../common/enum";
import { ButtonUI, Container, EmailInput, Stack, TextUI } from "../../components/atom";
import { actionSetCredentials, actionSetEmail, actionSetUserId, actionSetUserInfo } from "../../store/feature/auth";

export interface LoginScreenProps {
  navigation?: any;
}

function LoginScreen({ navigation }: LoginScreenProps) {
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const dispatch = useDispatch();
  const window = Dimensions.get("window");
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

  const redirectToOTP = useCallback(() => {
    navigation.navigate(ScreenName.VALIDATE_OTP_SCREEN, { replace: true });
  }, [navigation]);

  const onSubmit = (data: any) => {
    const email = data.email.toLowerCase();
    setLoadingSubmit(() => true);
    apiFetchUserByEmail(`${email}`)
      .then((result) => {
        const user = result.data;
        dispatch(actionSetUserId(user?.userId));
        dispatch(actionSetUserInfo(user));
        apiLoginInitialize(email, user?.userId).then((res) => {
          dispatch(actionSetCredentials(res.data));
          redirectToOTP();
        });
      })
      .catch((_error) => {
        redirectToNewUser();
      })
      .finally(() => {
        dispatch(actionSetEmail(email));
        setLoadingSubmit(() => false);
      });
  };

  return (
    <Container bg="slate50">
      <Stack
        style={{ paddingTop: 40, paddingBottom: 60, padding: 20, height: window.height - keyboardHeight }}
        justify="space-between"
        bg="slate50"
      >
        <Stack align="center">
          <Image
            source={require("../../../assets/login-email.png")}
            style={{
              marginTop: 40,
              width: 280,
              height: 240,
              resizeMode: "contain",
            }}
          />
          <TextUI fw="semi-bold" size="2xl" color="gray600">
            Sign in or sign up
          </TextUI>
          <TextUI color="gray400" ta="center" style={{ width: 300 }}>
            Enter your email, we will send you OTP to verify later
          </TextUI>
          <EmailInput name="email" control={control} required />
        </Stack>
        <ButtonUI
          color="sky"
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
