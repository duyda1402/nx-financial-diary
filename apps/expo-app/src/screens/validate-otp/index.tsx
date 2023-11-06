import { sx } from "@nfd/styles";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard } from "react-native";
import { ScreenName } from "../../common/enum";

import { useDispatch, useSelector } from "react-redux";
import { ButtonUI, Container, Group, OtpInput, Stack, TextUI } from "../../components/atom";
import BranchApp from "../../components/logo";
import { RootState } from "../../store";
import { apiLoginFinalize, apiLoginInitialize } from "../../api/auth.api";
import { actionSetCredentials, actionSetTokenInfo } from "../../store/feature/auth";
import { useNavigation } from "@react-navigation/native";

export interface LoginScreenProps {
  navigation: any;
}

function ValidateOtpScreen({ navigation }: LoginScreenProps) {
  //console.log(ValidateOtpScreen.name);
  // const navigation = useNavigation();
  // State Init
  const authStore = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [ttl, setTtl] = useState<number>(authStore?.credentials?.ttl || 300);
  const [isResend, setIsResend] = useState<boolean>(false);

  //Keyboard Init
  Keyboard.addListener("keyboardDidShow", (event) => {
    const keyboardHeight = event.endCoordinates.height;
    setKeyboardHeight(keyboardHeight);
  });

  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardHeight(0);
  });
  // Form Init
  const { control, handleSubmit, setValue } = useForm();
  //Callback Init
  const redirectToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.HOME_SCREEN }],
    });
  }, [navigation]);

  const redirectToLogin = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenName.SIGN_IN_SCREEN }],
    });
  }, [navigation]);

  const handlerResendOtp = async () => {
    const initialize = await apiLoginInitialize(authStore.email, authStore?.userId);
    dispatch(actionSetCredentials(initialize.data));
    setTtl(initialize.data.ttl);
  };

  const onSubmit = async (data: any) => {
    setLoadingSubmit(() => true);
    try {
      const res = await apiLoginFinalize(`${authStore?.credentials?.id}`, data.otp);
      dispatch(actionSetTokenInfo(res.data));
      redirectToHome();
    } catch (err) {
      Alert.alert("Error OTP", "The OTP you entered is invalid, Please try again!", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
      setValue("otp", "");
    } finally {
      setLoadingSubmit(() => false);
    }
  };

  //Effect Init
  useEffect(() => {
    const interval = setTimeout(() => {
      if (ttl > 0) {
        setTtl(ttl - 1);
      }
    }, 1000);
    if (ttl === 0) {
      setIsResend(true);
    }
    return () => clearTimeout(interval);
  }, [ttl]);

  return (
    <Container
      bg="white"
      style={[
        sx.pxMd,
        {
          paddingTop: 32,
        },
      ]}
      keyboardHeight={keyboardHeight}
    >
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
                {isResend ? (
                  <ButtonUI size="lg" color="sky" variant="subtle" radius="xl" onPress={handlerResendOtp}>
                    Re-send the OTP
                  </ButtonUI>
                ) : (
                  <>
                    <TextUI color="gray500" style={sx.mtSm}>
                      Re-send the OTP code in
                    </TextUI>
                    <TextUI fw="bold">{ttl}s</TextUI>
                  </>
                )}
              </Group>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="sm">
          <ButtonUI size="lg" color="sky" radius="xl" onPress={handleSubmit(onSubmit)} loading={loadingSubmit}>
            Continue
          </ButtonUI>
          <ButtonUI size="lg" color="sky" variant="subtle" radius="xl" onPress={redirectToLogin}>
            Other Email
          </ButtonUI>
        </Stack>
      </Stack>
    </Container>
  );
}

export default ValidateOtpScreen;
