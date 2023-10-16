import { sx } from "@nfd/styles";

import { useCallback, useEffect, useState } from "react";

import { Button, Layout, Text } from "@ui-kitten/components";
import { View } from "react-native";

import { ScreenName } from "../../common/enum";
import Group from "../../components/layout/Group";
import Stack from "../../components/layout/Stack";
import LoadingIndicator from "../../components/loader/LoaderIndicator";

export interface LoginScreenProps {
  navigation?: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

function NewUserScreen({ navigation }: LoginScreenProps) {
  console.log(NewUserScreen.name);
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  // FE SDK Init
  // const domiCore = useMemo(() => new DomiCore(API_URL), []);

  //Callback Init
  const redirectToHome = useCallback(() => {
    navigation.navigate(ScreenName.WELCOME_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToSignIn = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
  }, [navigation]);

  const handlerSignUp = useCallback(() => {
    // setLoadingSubmit(() => true);
    // domiCore.user
    //   .create("tuntun@gmail.com")
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error: any) => {
    //     console.log(JSON.stringify(error?.stack));
    //   })
    //   .finally(() => setLoadingSubmit(() => false));
  }, []);

  //Effect Init
  useEffect(() => {}, []);

  return (
    <Stack style={[sx.flex1, sx.mMd]}>
      <Group>
        <Text style={[sx.textLg, sx.textSemiBold]}>Create account?</Text>
      </Group>

      <Stack>
        <Text style={[sx.textMd]}>No account exists for "tuntun@gmail.com". Do you want to create a new account?</Text>
        <Group position="between">
          <Button status="info" onPress={redirectToHome} appearance="ghost">
            Back
          </Button>
          {loadingSubmit ? (
            <Button status="info" accessoryLeft={() => <LoadingIndicator />} appearance="outline">
              Sign up
            </Button>
          ) : (
            <Button status="info" onPress={redirectToSignIn} appearance="outline">
              Sign up
            </Button>
          )}
        </Group>
      </Stack>
    </Stack>
  );
}

export default NewUserScreen;
