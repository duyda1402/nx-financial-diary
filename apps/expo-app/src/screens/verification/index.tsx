import { sx } from "@nfd/styles";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Image, Dimensions } from "react-native";
import { ScreenName } from "../../common/enum";

import { useDispatch, useSelector } from "react-redux";
import { ButtonUI, Container, Group, OtpInput, Stack, TextUI } from "../../components/atom";
import BranchApp from "../../components/logo";
import { RootState } from "../../store";
import { apiLoginFinalize, apiLoginInitialize } from "../../api/auth.api";
import { actionSetCredentials, actionSetTokenInfo } from "../../store/feature/auth";

export interface LoginScreenProps {
  navigation: any;
}

function ValidateOtpScreen({ navigation }: LoginScreenProps) {
  // Store Init
  const authStore = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [ttl, setTtl] = useState<number>(authStore?.credentials?.ttl || 300);
  const [isResend, setIsResend] = useState<boolean>(false);

  //Keyboard Init
  const window = Dimensions.get("window");
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
    <Container bg="slate50" keyboardHeight={keyboardHeight}>
      <Stack
        style={{ paddingTop: 40, paddingBottom: 60, padding: 20, height: window.height }}
        justify="space-between"
        bg="slate50"
      >
        <Stack align="center">
          <Image
            source={require("../../../assets/verification.png")}
            style={{
              marginTop: 60,
              width: 280,
              height: 200,
              resizeMode: "contain",
            }}
          />
          <TextUI fw="semi-bold" size="2xl" color="gray600">
            Verification
          </TextUI>
          <TextUI color="gray400" ta="center" style={{ width: 300 }}>
            Enter 6 digit number that sen to{" "}
            <TextUI color="gray600" fw="semi-bold">
              {authStore.email}
            </TextUI>
          </TextUI>
          <OtpInput name="otp" control={control} required noWrap />
          <Group position="center" spacing="xs">
            {isResend ? (
              <ButtonUI size="lg" color="sky" variant="subtle" radius="xl" onPress={handlerResendOtp}>
                Re-send the OTP
              </ButtonUI>
            ) : (
              <>
                <TextUI color="gray400">Re-send the OTP code in</TextUI>
                <TextUI fw="semi-bold">{ttl}s</TextUI>
              </>
            )}
          </Group>
        </Stack>
        <Stack spacing="sm">
          <ButtonUI size="lg" color="sky" radius="xl" onPress={handleSubmit(onSubmit)} loading={loadingSubmit}>
            Continue
          </ButtonUI>
          <ButtonUI size="lg" color="sky" variant="subtle" radius="xl" onPress={() => navigation.goBack()}>
            Other email
          </ButtonUI>
        </Stack>
      </Stack>
    </Container>
  );
}

export default ValidateOtpScreen;
