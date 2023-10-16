import { colors, sx } from "@nfd/styles";

import { Button, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { ScreenName } from "../../common/enum";
import EmailInput from "../../components/input-ui/EmailInput";
import Group from "../../components/layout/Group";
import Stack from "../../components/layout/Stack";
import LoadingIndicator from "../../components/loader/LoaderIndicator";
import { Dimensions } from "react-native";

export interface LoginScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function LoginScreen({ navigation }: LoginScreenProps) {
  const { control, handleSubmit } = useForm();
  const window = Dimensions.get("window");
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
    <Stack style={[{ height: window.height, backgroundColor: colors.white }, sx.pMd]} justify="space-between">
      <Stack style={[sx.mtXl]}>
        <Group position="center">
          <Text style={[sx.textLg, sx.textSemiBold]}>Sign in or sign up</Text>
        </Group>
        <Stack spacing="sm">
          <Text>Email:</Text>
          <EmailInput name="email" control={control} withAsterisk />
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
  );
}

export default LoginScreen;
