import { sx } from "@nfd/styles";

import { useCallback, useEffect, useState } from "react";

import { Button, Text } from "@ui-kitten/components";

import { ScreenName } from "../../common/enum";
import Container from "../../components/layout/Container";
import Group from "../../components/layout/Group";
import Stack from "../../components/layout/Stack";
import LoadingIndicator from "../../components/loader/LoaderIndicator";

export interface CreateAccountScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function CreateAccountScreen({ navigation }: CreateAccountScreenProps) {
  console.log(CreateAccountScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  // FE SDK Init
  // const domiCore = useMemo(() => new DomiCore(API_URL), []);

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
        <Stack style={[sx.mtXl]}>
          <Group position="center">
            <Text style={[sx.textXl, sx.fontBold]}>Create account?</Text>
          </Group>
          <Stack spacing="sm">
            <Text style={[sx.textBase]}>
              No account exists for "tuntun@gmail.com". Do you want to create a new account?
            </Text>
          </Stack>
        </Stack>
        {loadingSubmit ? (
          <Button status="info" accessoryLeft={() => <LoadingIndicator />}>
            Sign up
          </Button>
        ) : (
          <Button status="info" onPress={handlerSignUp}>
            Sign up
          </Button>
        )}
      </Stack>
    </Container>
  );
}

export default CreateAccountScreen;
