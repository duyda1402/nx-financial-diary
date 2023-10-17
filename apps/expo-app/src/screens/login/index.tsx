import { sx } from "@nfd/styles";

import { Button, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { ScreenName } from "../../common/enum";
import EmailInput from "../../components/input-ui/EmailInput";
import Container from "../../components/layout/Container";
import Group from "../../components/layout/Group";
import Stack from "../../components/layout/Stack";
import LoadingIndicator from "../../components/loader/LoaderIndicator";

export interface LoginScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function LoginScreen({ navigation }: LoginScreenProps) {
  console.log(LoginScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  // FE SDK Init
  // const domiCore = useMemo(() => new DomiCore(API_URL), []);
  // Form Init
  const { control, handleSubmit } = useForm();
  //Callback Init
  const redirectToHome = useCallback(() => {
    navigation.navigate(ScreenName.WELCOME_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToNewUser = useCallback(() => {
    navigation.navigate(ScreenName.CREATE_ACCOUNT_SCREEN, { replace: true });
  }, [navigation]);

  const onSubmit = (data: any) => {
    setLoadingSubmit(() => true);
    setLoadingSubmit(() => false);
    redirectToNewUser();
  };

  //Effect Init
  useEffect(() => {}, []);

  return (
    <Container style={[sx.pxMd]}>
      <Stack style={[sx.hFull]} justify="space-between">
        <Stack style={[sx.mtXl]}>
          <Group position="center">
            <Text style={[sx.textXl, sx.fontBold]}>Sign in or sign up</Text>
          </Group>
          <Stack spacing="sm">
            <Text>Enter Email:</Text>
            <EmailInput name="email" control={control} required />
          </Stack>
        </Stack>
        {loadingSubmit ? (
          <Button status="info" accessoryLeft={() => <LoadingIndicator />}>
            Continue
          </Button>
        ) : (
          <Button status="info" onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        )}
      </Stack>
    </Container>
  );
}

export default LoginScreen;
