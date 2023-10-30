import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AddNewTab from "./tabs/AddNew";
import HomeTab from "./tabs/Home";
import SettingTab from "./tabs/Setting";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

type Props = {};

function HomeScreen({}: Props) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="New" component={AddNewTab} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingTab} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
