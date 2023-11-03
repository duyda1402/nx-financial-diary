import { sx } from "@nfd/styles";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { apiFetchUserByEmail, apiGetMe, apiLoginInitialize } from "../../api/auth.api";
import { ScreenName } from "../../common/enum";
import { ButtonUI, Container, EmailInput, Stack, TextUI } from "../../components/atom";
import BranchApp from "../../components/logo";
import { useDispatch } from "react-redux";
import { actionSetCredentials, actionSetEmail, actionSetUserId, actionSetUserInfo } from "../../store/feature/auth";

export interface LoginScreenProps {
  navigation?: any;
}

function LoginScreen({ navigation }: LoginScreenProps) {
  console.log(LoginScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const dispatch = useDispatch();
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

  const redirectToHome = useCallback(() => {
    navigation.navigate(ScreenName.HOME_SCREEN, { replace: true });
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
        dispatch(actionSetEmail(email));
        redirectToNewUser();
      })
      .finally(() => {
        setLoadingSubmit(() => false);
      });
  };

  //Effect Init
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const resMe = await apiGetMe();
        if (resMe.code === 200) {
          return redirectToHome();
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchAuth();
  }, []);

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
              <EmailInput defaultValue="nhc39102@omeie.com" name="email" control={control} required />
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
