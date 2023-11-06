import { sx } from "@nfd/styles";

import { useCallback, useEffect, useState } from "react";
import { ScreenName } from "../../common/enum";

import { ButtonUI, Container, Group, Stack, TextUI } from "../../components/atom";
import BranchApp from "../../components/logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { apiCreateUserByEmail, apiLoginInitialize } from "../../api/auth.api";
import { actionSetCredentials, actionSetUserId, actionSetUserInfo } from "../../store/feature/auth";

export interface CreateAccountScreenProps {
  navigation?: any;
}

function CreateAccountScreen({ navigation }: CreateAccountScreenProps) {
  console.log(CreateAccountScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const authStore = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  //Callback Init
  const redirectToValidateOtp = useCallback(() => {
    navigation.navigate(ScreenName.VALIDATE_OTP_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToSignIn = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
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

  //Effect Init
  useEffect(() => {}, []);

  return (
    <Container
      bg="white"
      style={[
        sx.pxMd,
        {
          paddingTop: 32,
        },
      ]}
    >
      <Stack style={[sx.hFull]} justify="space-between">
        <Stack style={sx.mtXl}>
          <BranchApp position="center" />
          <Stack style={sx.mtXl}>
            <TextUI fw="bold" size="4xl" ta="center">
              Create account?
            </TextUI>
            <Stack spacing="sm">
              <TextUI>
                No account exists for <TextUI fw="semi-bold">{authStore.email}</TextUI>. Do you want to create a new
                account?
              </TextUI>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="sm">
          <ButtonUI size="lg" color="sky" variant="filled" radius="xl" onPress={handlerSignUp} loading={loadingSubmit}>
            Sign up
          </ButtonUI>
          <ButtonUI size="lg" color="gray" variant="subtle" radius="xl" onPress={redirectToSignIn}>
            Back
          </ButtonUI>
        </Stack>
      </Stack>
    </Container>
  );
}

export default CreateAccountScreen;
