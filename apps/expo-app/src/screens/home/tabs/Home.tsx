import { colors, sx } from "@nfd/styles";
import { Avatar, Icon, IconElement, Text } from "@ui-kitten/components";
import { AVATAR_DEFAULT } from "apps/expo-app/src/common";
import Container from "apps/expo-app/src/components/layout/Container";
import Group from "apps/expo-app/src/components/layout/Group";
import Stack from "apps/expo-app/src/components/layout/Stack";
import LoadingIndicator from "apps/expo-app/src/components/loader/LoaderIndicator";
import { formatNumberWithCommas } from "apps/expo-app/src/ultis";
import { useEffect, useState } from "react";

export interface HomeTabProps {
  navigation?: any;
}

function HomeTab({ navigation }: HomeTabProps) {
  console.log(HomeTab.name);
  // State Init
  const [loading, setLoading] = useState<boolean>(false);
  const name = "Do Duy";
  const totalBalance = 80000;
  //Effect Init
  useEffect(() => {}, []);

  return (
    <>
      {loading ? (
        <Stack style={{ flex: 1 }}>
          <LoadingIndicator />
        </Stack>
      ) : (
        <Container style={[]} bg={colors.sky400}>
          <Stack style={[sx.mtMd, sx.pxMd]}>
            <Group position="between" align="center">
              <Text style={[{ color: colors.white }, sx.fontBold, sx.text2Xl]}>Hello {name}!</Text>
              <Avatar
                style={{ borderWidth: 2, borderColor: colors.white }}
                size="medium"
                source={{
                  uri: AVATAR_DEFAULT,
                }}
              />
            </Group>
            <Stack style={[sx.hero, { backgroundColor: colors.gray100 }]}>
              <Group position="between">
                <Stack spacing="sm">
                  <Text style={[{ color: colors.gray500 }]}>Total balance:</Text>
                  <Text style={[{ color: colors.sky400 }, sx.textXl, sx.fontBold]}>
                    {formatNumberWithCommas(totalBalance)} $
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Stack>
          <Stack style={[{ backgroundColor: colors.gray100, height: 800 }]}></Stack>
        </Container>
      )}
    </>
  );
}

export default HomeTab;
