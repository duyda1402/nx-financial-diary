/* eslint-disable jsx-a11y/accessible-emoji */
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import LoginScreen from "./screens/login";
import WelcomeScreen from "./screens/welcome";
import { ScreenName } from "./common/enum";
import NewUserScreen from "./screens/new-user";
import ValidateOtpScreen from "./screens/validate-otp";
import HomeScreen from "./screens/home";
const Stack = createNativeStackNavigator();

export const AppMain = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenName.NEW_USER_SCREEN}>
          <Stack.Screen name={ScreenName.WELCOME_SCREEN} component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name={ScreenName.SIGN_IN_SCREEN} component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name={ScreenName.NEW_USER_SCREEN} component={NewUserScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name={ScreenName.VALIDATE_OTP_SCREEN}
            component={ValidateOtpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={ScreenName.HOME_SCREEN} component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default AppMain;
