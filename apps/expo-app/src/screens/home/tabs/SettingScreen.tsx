import { Menu, MenuItem } from "@ui-kitten/components";
import { BG_BASE } from "apps/expo-app/src/common";
import { ScreenName } from "apps/expo-app/src/common/enum";
import { AvatarUI, ButtonUI, Group, Stack, TextUI } from "apps/expo-app/src/components/atom";
import IconChevronRight from "apps/expo-app/src/components/atom/icons/IconChevronRight";
import { RootState } from "apps/expo-app/src/store";
import { actionRemoveAuth } from "apps/expo-app/src/store/feature/auth";
import { mapUrlAsset } from "apps/expo-app/src/utils";
import { useCallback, useEffect, useState } from "react";
import { Alert, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export interface SettingTabProps {
  navigation?: any;
}

function SettingScreen({ navigation }: SettingTabProps) {
  // console.log(SettingTab.name);
  // State Init
  const [loading, setLoading] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.auth.info);
  const dispatch = useDispatch();
  //Effect Init
  useEffect(() => {
    setLoading(() => true);
    setTimeout(() => setLoading(() => false), 500);
  }, []);

  const redirectToLogin = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
  }, [navigation]);

  const redirectToEditUser = useCallback(() => {
    navigation.navigate(ScreenName.EDIT_USER, { replace: true });
  }, [navigation]);

  const handlerLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Logout"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch(actionRemoveAuth());
          return redirectToLogin();
        },
      },
    ]);
  };

  return (
    <Stack>
      <ImageBackground
        style={{ paddingTop: 32, backgroundColor: "rgba(0, 0, 0, 1)" }}
        imageStyle={{ opacity: 0.6 }}
        source={{ uri: BG_BASE }}
      >
        <Stack align="center" justify="center" style={{ minHeight: 300 }} spacing={8}>
          <AvatarUI
            size="xl"
            radius={9999}
            uri={mapUrlAsset(userInfo?.profileUrl) || ""}
            withBorder
            withBorderColor="gray"
          />
          <TextUI fw="semi-bold" size="lg" color="white">
            {userInfo?.displayName}
          </TextUI>
          <TextUI color="gray300">{userInfo?.email}</TextUI>
          <ButtonUI variant="outline" color="orange" onPress={redirectToEditUser}>
            Edit
          </ButtonUI>
        </Stack>
      </ImageBackground>
      <Stack bg="white">
        <Menu>
          <MenuItem title="Language" accessoryRight={<IconChevronRight />} />
          <MenuItem title="Currency" accessoryRight={<IconChevronRight />} />
          <MenuItem title="Rate app" accessoryRight={<IconChevronRight />} />
          <MenuItem title="Log out" onPress={handlerLogout} accessoryRight={<IconChevronRight />} />
        </Menu>
      </Stack>
      <Group position="center">
        <TextUI color="gray400" size="xs">
          version 1.0.1
        </TextUI>
      </Group>
    </Stack>
  );
}

export default SettingScreen;
