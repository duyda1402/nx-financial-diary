import { sx } from "@nfd/styles";

import { useCallback, useEffect, useState } from "react";

import { Button, Layout, Text } from "@ui-kitten/components";
import { View } from "react-native";

import { ScreenName } from "../../common/enum";
import Group from "../../components/layout/Group";
import Stack from "../../components/layout/Stack";
import LoadingIndicator from "../../components/loader/LoaderIndicator";
import EmailInput from "../../components/input-ui/EmailInput";
import { useForm } from "react-hook-form";

export interface LoginScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function LoginScreen({ navigation }: LoginScreenProps) {
  const { control, handleSubmit } = useForm();

  console.log(LoginScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  // FE SDK Init
  // const domiCore = useMemo(() => new DomiCore(API_URL), []);

  //Callback Init
  const redirectToHome = useCallback(() => {
    navigation.navigate(ScreenName.WELCOME_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToNewUser = useCallback(() => {
    navigation.navigate(ScreenName.NEW_USER_SCREEN, { replace: true });
  }, [navigation]);

  const onSubmit = (data: any) => {
    setLoadingSubmit(() => true);
    setLoadingSubmit(() => false);
    redirectToNewUser();
  };

  //Effect Init
  useEffect(() => {}, []);

  return (
    <Stack style={[sx.flex1, sx.mMd]}>
      <Group>
        <Text style={[sx.textLg, sx.textSemiBold]}>Create account?</Text>
      </Group>

      <Stack>
        <EmailInput name="email" control={control} withAsterisk />
        <Group position="between">
          <Button status="info" onPress={redirectToHome} appearance="ghost">
            Back
          </Button>
          {loadingSubmit ? (
            <Button status="info" accessoryLeft={() => <LoadingIndicator />} appearance="outline">
              Continue
            </Button>
          ) : (
            <Button status="info" onPress={handleSubmit(onSubmit)} appearance="outline">
              Continue
            </Button>
          )}
        </Group>
      </Stack>
    </Stack>
  );
}

export default LoginScreen;
