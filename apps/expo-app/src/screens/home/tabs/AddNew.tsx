import { sx } from "@nfd/styles";
import { Text } from "@ui-kitten/components";
import { Container, Stack } from "apps/expo-app/src/components/atom";

import LoadingIndicator from "apps/expo-app/src/components/loader/LoaderIndicator";
import { useEffect, useState } from "react";

export interface AddNewTabProps {
  navigation?: any;
}

function AddNewTab({ navigation }: AddNewTabProps) {
  console.log(AddNewTab.name);
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
            <Text>Add Tabs</Text>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default AddNewTab;
