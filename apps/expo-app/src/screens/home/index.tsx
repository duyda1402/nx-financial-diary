import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useState } from "react";
import AddNewTab from "./tabs/AddNew";
import HomeTab from "./tabs/Home";
import SettingTab from "./tabs/Setting";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { apiGetMe, apiGetUserById } from "../../api/auth.api";
import { ScreenName } from "../../common/enum";
import { useDispatch } from "react-redux";
import { actionSetEmail, actionSetUserId, actionSetUserInfo } from "../../store/feature/auth";
import { Stack } from "../../components/atom";
import LoadingIndicator from "../../components/loader/LoaderIndicator";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeDefault" component={HomeTab} options={{ headerShown: false }} />
      <HomeStack.Screen name="Details" component={SettingTab} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

type Props = { navigation?: any };

function HomeScreen({ navigation }: Props) {
  //Store Init
  const dispatch = useDispatch();
  //State Init
  const [loadingScreen, setLoadingScreen] = useState<boolean>(true);

  const redirectToSignIn = useCallback(() => {
    navigation.navigate(ScreenName.SIGN_IN_SCREEN, { replace: true });
  }, [navigation]);

  useEffect(() => {
    const fetchAuth = async () => {
      const resMe = await apiGetMe();
      if (resMe.code !== 200) {
        return redirectToSignIn();
      }
      dispatch(actionSetUserId(resMe.data.id));
      const res = await apiGetUserById(resMe.data.id);
      dispatch(actionSetUserInfo(res.data));
      dispatch(actionSetEmail(res.data.email));
      setLoadingScreen(() => false);
    };
    fetchAuth();
  }, []);

  return (
    <>
      {loadingScreen ? (
        <Stack style={{ flex: 1 }}>
          <LoadingIndicator />
        </Stack>
      ) : (
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
          <Tab.Screen name="New" component={AddNewTab} options={{ headerShown: false }} />
          <Tab.Screen name="Settings" component={SettingTab} options={{ headerShown: false }} />
        </Tab.Navigator>
      )}
    </>
  );
}

export default HomeScreen;
