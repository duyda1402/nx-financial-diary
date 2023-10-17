import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabDescriptorMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity } from "react-native";
import Group from "../../components/layout/Group";

const Tab = createBottomTabNavigator();

type Props = {};

function HomeScreen({}: Props) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={ViewDemo} options={{ headerShown: false }} />
      <Tab.Screen name="New" component={ViewDemo} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={ViewDemo} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default HomeScreen;

function ViewDemo() {
  return (
    <Layout>
      <Text> tss</Text>
    </Layout>
  );
}
type TabBar = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: any;
};
function TabBar({ state, descriptors, navigation }: TabBar) {
  return (
    <Group>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </Group>
  );
}
