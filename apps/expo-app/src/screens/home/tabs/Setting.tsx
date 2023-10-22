import { sx } from "@nfd/styles";
import { Text } from "@ui-kitten/components";
import { ScreenName } from "apps/expo-app/src/common/enum";
import { Stack, Container } from "apps/expo-app/src/components/atom";

import LoadingIndicator from "apps/expo-app/src/components/loader/LoaderIndicator";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-native";

export interface SettingTabProps {
  navigation?: any;
}

function SettingTab({ navigation }: SettingTabProps) {
  console.log(SettingTab.name);
  // State Init
  const [loading, setLoading] = useState<boolean>(false);

  //Effect Init
  useEffect(() => {
    setLoading(() => true);
    setTimeout(() => setLoading(() => false), 500);
  }, []);

  const redirectToNewUser = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
  }, [navigation]);

  return (
    <>
      {loading ? (
        <Stack style={{ flex: 1 }}>
          <LoadingIndicator />
        </Stack>
      ) : (
        <Container style={[sx.pxMd]}>
          <Stack>
            <Text>Setting Tabs</Text>
            <Button title="Logout" onPress={redirectToNewUser} />
          </Stack>
        </Container>
      )}
    </>
  );
}

export default SettingTab;
