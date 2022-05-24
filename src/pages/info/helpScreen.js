
import { ChatScreen } from "./helpScreens/chatScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import FaqScreen from "./helpScreens/faqScreen";
import MainList from "./helpScreens/mainList";
import Icon from "react-native-vector-icons/Ionicons";
import TutorialScreen from "./helpScreens/tutorialScreen";
import { OnBoarding } from "../onBoarding/onBoarding";
import useUserSettings from "../../hooks/useUserSettings";
import i18n from "i18n-js";

function HelpScreen({ navigation }) {
  useUserSettings();
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator initialRouteName="MainList">
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              title: i18n.t("help.chat"),
            }}
            />
          <Stack.Screen
            name="FaqScreen"
            component={FaqScreen}
            options={{
              title: i18n.t("help.faq"),
            }}
            />
          <Stack.Screen
            name="MainList"
            component={MainList}
            options={{
              title: i18n.t("help.title"),
            }}
            />
          <Stack.Screen
            name="TutorialScreen"
            component={OnBoarding}
            options={{
              title: i18n.t("help.tutorial"),
            }}
            />
      </Stack.Navigator>
  );
}
export default HelpScreen;
