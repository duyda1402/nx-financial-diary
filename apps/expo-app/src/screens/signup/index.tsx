import { useCallback, useState } from "react";
import { ScreenName } from "../../common/enum";

import { Dimensions, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiCreateUserByEmail, apiLoginInitialize } from "../../api/auth.api";
import { ButtonUI, Container, Stack, TextUI } from "../../components/atom";
import { RootState } from "../../store";
import { actionSetCredentials, actionSetUserId, actionSetUserInfo } from "../../store/feature/auth";

export interface CreateAccountScreenProps {
  navigation?: any;
}

function CreateAccountScreen({ navigation }: CreateAccountScreenProps) {
  const window = Dimensions.get("window");
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const authStore = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  //Callback Init
  const redirectToValidateOtp = useCallback(() => {
    navigation.navigate(ScreenName.VALIDATE_OTP_SCREEN, { replace: true });
  }, [navigation]);

  const handlerSignUp = async () => {
    setLoadingSubmit(() => true);
    const result = await apiCreateUserByEmail(authStore.email);
    const user = result.data;
    dispatch(actionSetUserId(user?.userId));
    dispatch(actionSetUserInfo(user));
    const initialize = await apiLoginInitialize(authStore.email, user?.userId);
    dispatch(actionSetCredentials(initialize.data));
    redirectToValidateOtp();
    setLoadingSubmit(() => false);
  };

  return (
    <Container bg="slate50">
      <Stack
        style={{ paddingTop: 40, paddingBottom: 60, padding: 20, height: window.height }}
        justify="space-between"
        bg="slate50"
      >
        <Stack align="center">
          <Image
            source={require("../../../assets/sign-up.png")}
            style={{
              marginTop: 40,
              width: 280,
              height: 240,
              resizeMode: "contain",
            }}
          />
          <TextUI fw="semi-bold" size="2xl" color="gray600">
            Create account?
          </TextUI>
          <TextUI color="gray400" ta="center" style={{ width: 300 }}>
            No account exists for{" "}
            <TextUI fw="semi-bold" color="gray600">
              {authStore.email}
            </TextUI>
            . Do you want to create a new account?
          </TextUI>
        </Stack>
        <Stack spacing="sm">
          <ButtonUI size="lg" color="sky" variant="filled" radius="xl" onPress={handlerSignUp} loading={loadingSubmit}>
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

export default CreateAccountScreen;
