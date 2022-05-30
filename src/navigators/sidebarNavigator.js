import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./mainNavigator";
import { ProfileScreen, SettingsScreen, VehicleConfig, OnBoarding } from "../pages";
import useAuth from "../hooks/useAuth";
import useUserSettings from "../hooks/useUserSettings";
import { CustomDrawer } from "./customDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "i18n-js";
import { ReportApplicationScreen }  from "../pages/reportScreen/ReportApplicationScreen";
import { AchievementsScreen } from "../pages/achievements/achievementsScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HelpScreen from "../pages/info/helpScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function SidebarNavigator() {
  useUserSettings();
  const { auth } = useAuth();

  const customStyle = require("../utils/customStyleSheet");

  

  return auth?.user?.isNew ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          initialParams={{ goToMap: false }}
          options={{ 
            drawerItemStyle: { display: "none" }, 
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VehicleConfig"
          component={VehicleConfig}
          options={{ 
            drawerItemStyle: { display: "none" }, 
            headerShown: false,
           }}
        />
        <Stack.Screen
          name="Home"
          component={MainNavigator}
          options={{
            title: `${i18n.t("drawer.home")}`,
            drawerLabelStyle: customStyle.normalText,
            drawerActiveBackgroundColor: '#f3edff',
            header: () => null,
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={'#8200d6'} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="Home"
          component={MainNavigator}
          options={{
            title: `${i18n.t("drawer.home")}`,
            drawerLabelStyle: customStyle.normalText,
            drawerActiveBackgroundColor: '#f3edff',
            header: () => null,
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={'#8200d6'} />
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: `${i18n.t("drawer.profile")}`,
            drawerLabelStyle: customStyle.normalText,
            drawerActiveBackgroundColor: '#f3edff',
            headerStyle: {
              backgroundColor: '#f3edff'
            },
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={'#8200d6'} />
            ),
          }}
        />
        <Drawer.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{
            drawerActiveBackgroundColor: '#f3edff',
            title: `${i18n.t("drawer.achievements")}`,
            drawerLabelStyle: customStyle.normalText,
            drawerIcon: ({ color }) => (
              <Ionicons name="trophy-outline" size={22} color={'#8200d6'} />
            ),
            headerStyle: {
              backgroundColor: '#f3edff'
            },
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
          name="ReportApplicationScreen"
          component={ReportApplicationScreen}
          options={{ drawerItemStyle: { display: "none" },
            drawerLabelStyle: customStyle.normalText, 
            title: `${i18n.t("drawer.report")}`,
            headerStyle: {
              backgroundColor: '#f3edff'
            },
          }
        }
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={{ drawerItemStyle: { display: "none" },
            drawerLabelStyle: customStyle.normalText,
          headerShown: false }
          }
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export { SidebarNavigator };
