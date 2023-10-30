/* eslint-disable jsx-a11y/accessible-emoji */
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import LoginScreen from "./screens/login";
import WelcomeScreen from "./screens/welcome";
import { ScreenName } from "./common/enum";
import CreateAccountScreen from "./screens/create-account";
import ValidateOtpScreen from "./screens/validate-otp";
import HomeScreen from "./screens/home";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();

export const AppMain = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ScreenName.SIGN_IN_SCREEN}>
            <Stack.Screen name={ScreenName.WELCOME_SCREEN} component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name={ScreenName.SIGN_IN_SCREEN} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={ScreenName.CREATE_ACCOUNT_SCREEN}
              component={CreateAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenName.VALIDATE_OTP_SCREEN}
              component={ValidateOtpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={ScreenName.HOME_SCREEN} component={HomeScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </ApplicationProvider>
  );
};

export default AppMain;
