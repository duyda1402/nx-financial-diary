import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AddNewTab from "./tabs/AddNew";
import HomeTab from "./tabs/Home";
import SettingTab from "./tabs/Setting";

const Tab = createBottomTabNavigator();

type Props = {};

function HomeScreen({}: Props) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />
      <Tab.Screen name="New" component={AddNewTab} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingTab} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
