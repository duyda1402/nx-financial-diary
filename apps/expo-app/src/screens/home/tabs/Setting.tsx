import { sx } from "@nfd/styles";
import { Text } from "@ui-kitten/components";
import Container from "apps/expo-app/src/components/layout/Container";
import Stack from "apps/expo-app/src/components/layout/Stack";
import LoadingIndicator from "apps/expo-app/src/components/loader/LoaderIndicator";
import { useEffect, useState } from "react";

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
          </Stack>
        </Container>
      )}
    </>
  );
}

export default SettingTab;
