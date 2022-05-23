import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./mainNavigator";
import { ProfileScreen, SettingsScreen, VehicleConfig,VehicleConfigStarter, OnBoarding } from "../pages";
import useAuth from "../hooks/useAuth";
import useUserSettings from "../hooks/useUserSettings";
import { CustomDrawer } from "./customDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "i18n-js";
import { ReportAplicationScreen } from "../pages/reportScreen/ReportAplicationScreen";
import { AchievementsScreen } from "../pages/achievements/achievementsScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HelpScreen from "../pages/info/helpScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function SidebarNavigator() {
  useUserSettings();
  const { auth } = useAuth();

  return auth?.user?.isNew ? (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Stack.Screen
          name="VehicleConfigStarter"
          component={VehicleConfigStarter}
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Stack.Screen
          name="OnBoardingStart"
          component={OnBoarding}
           options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer.Navigator>
      <VehicleConfigStarter />
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="Home"
          component={MainNavigator}
          options={{
            title: `${i18n.t("drawer.home")}`,
            header: () => null,
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: `${i18n.t("drawer.profile")}`,
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{
            title: `${i18n.t("drawer.achievements")}`,
            drawerIcon: ({ color }) => (
              <Ionicons name="trophy-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Help"
          component={HelpScreen}
          options={{
            title: `${i18n.t("drawer.help")}`,
            drawerIcon: ({ color }) => (
              <Icon name="chat-alert-outline" size={22} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VehicleConfig"
          component={VehicleConfig}
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
           options={{ drawerItemStyle: { display: "none" } }}
        />
        <Stack.Screen
          name="ReportAplicationScreen"
          component={ReportAplicationScreen}
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export { SidebarNavigator };
