import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useState } from "react";
import MiddleScreen from "./tabs/MiddleScreen";
import HomeTab from "./tabs/HomeStack";
import SettingScreen from "./tabs/SettingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { apiGetMe, apiGetUserById } from "../../api/auth.api";
import { ScreenName } from "../../common/enum";
import { useDispatch } from "react-redux";
import { actionSetEmail, actionSetUserId, actionSetUserInfo } from "../../store/feature/auth";
import { Stack } from "../../components/atom";
import LoadingIndicator from "../../components/loader/LoaderIndicator";
import EditUserScreen from "../edit-account";
import { apiWalletByUser } from "../../api/wallet.api";
import { actionSetWallets } from "../../store/feature/resources";
import { actionSelectWallet } from "../../store/feature/selector";
import SelectWalletScreen from "../wallet/SelectWallet";
import { colors } from "@nfd/styles";
import IconSettingsFilled from "../../components/atom/icons/IconSettingsFilled";
import IconSquareRoundedPlusFilled from "../../components/atom/icons/IconSquareRoundedPlusFilled";
import IconAppsFilled from "../../components/atom/icons/IconAppsFilled";
import BudgetListScreen from "../budget/BudgetList";
import TransactionListScreen from "../transaction/TransactionList";
import AddWalletScreen from "../wallet/AddWallet";

const HomeStack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="HomeDefault">
      <HomeStack.Screen name="HomeDefault" component={HomeTab} options={{ headerShown: false }} />
      <HomeStack.Screen
        name={ScreenName.TRANSACTION_HISTORY}
        component={TransactionListScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name={ScreenName.ADD_WALLET} component={AddWalletScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name={ScreenName.BUDGET_LIST} component={BudgetListScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const SettingStack = createNativeStackNavigator();

function SettingNavigator() {
  return (
    <SettingStack.Navigator initialRouteName="SettingDefault">
      <SettingStack.Screen name="SettingDefault" component={SettingScreen} options={{ headerShown: false }} />
      <SettingStack.Screen name={ScreenName.EDIT_USER} component={EditUserScreen} options={{ headerShown: false }} />
      <SettingStack.Screen name={ScreenName.BUDGET_LIST} component={SettingScreen} options={{ headerShown: false }} />
    </SettingStack.Navigator>
  );
}

const MiddleStack = createNativeStackNavigator();

function MiddleNavigator() {
  return (
    <MiddleStack.Navigator initialRouteName="MiddleDefault">
      <MiddleStack.Screen name="MiddleDefault" component={MiddleScreen} options={{ headerShown: false }} />
      <MiddleStack.Screen
        name={ScreenName.SELECT_WALLET_LIST}
        component={SelectWalletScreen}
        options={{ headerShown: false }}
      />
    </MiddleStack.Navigator>
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
      const wallets = await apiWalletByUser();
      dispatch(actionSetWallets(wallets));
      dispatch(actionSelectWallet(wallets[0]));
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
          <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={{
              headerShown: false,
              tabBarInactiveTintColor: colors.gray400,
              tabBarActiveTintColor: colors.orange400,
              tabBarIcon: (props) => <IconAppsFilled size={30} color={props.color} />,
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            name="Add"
            component={MiddleNavigator}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarInactiveTintColor: colors.gray400,
              tabBarActiveTintColor: colors.orange400,
              tabBarIcon: (props) => <IconSquareRoundedPlusFilled size={32} />,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingNavigator}
            options={{
              headerShown: false,
              tabBarInactiveTintColor: colors.gray400,
              tabBarActiveTintColor: colors.orange400,
              tabBarIcon: (props) => {
                return <IconSettingsFilled size={30} color={props.color} />;
              },
              tabBarShowLabel: false,
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
}

export default HomeScreen;
