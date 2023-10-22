import { sx } from "@nfd/styles";

import { useCallback, useEffect, useState } from "react";
import { ScreenName } from "../../common/enum";

import { ButtonUI, Container, Group, Stack, TextUI } from "../../components/atom";
import BranchApp from "../../components/logo";

export interface CreateAccountScreenProps {
  navigation?: any;
}

function CreateAccountScreen({ navigation }: CreateAccountScreenProps) {
  console.log(CreateAccountScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  //Callback Init
  const redirectToValidateOtp = useCallback(() => {
    navigation.navigate(ScreenName.VALIDATE_OTP_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToSignIn = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
  }, [navigation]);

  const handlerSignUp = useCallback(() => {
    redirectToValidateOtp();
  }, []);

  //Effect Init
  useEffect(() => {}, []);

  return (
    <Container style={[sx.pxMd]}>
      <Stack style={[sx.hFull]} justify="space-between">
        <Stack style={sx.mtXl}>
          <BranchApp position="center" />
          <Stack style={sx.mtXl}>
            <TextUI fw="bold" size="4xl" ta="center">
              Create account?
            </TextUI>
            <Stack spacing="sm">
              <TextUI>
                No account exists for <TextUI fw="semi-bold">"tuntun@gmail.com"</TextUI>. Do you want to create a new
                account?
              </TextUI>
            </Stack>
          </Stack>
        </Stack>

        <ButtonUI size="lg" color="orange" variant="filled" radius="xl" onPress={handlerSignUp} loading={loadingSubmit}>
          Sign up
        </ButtonUI>
      </Stack>
    </Container>
  );
}

export default CreateAccountScreen;
