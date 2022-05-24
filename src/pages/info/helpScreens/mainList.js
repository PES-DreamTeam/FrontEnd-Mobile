import { useEffect } from "react";
import { Text, View } from "react-native";
import Button from "../../../utils/button";
import Icon from "react-native-vector-icons/Ionicons";

function MainList({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="arrow-back-outline"
          onPress={() => navigation.goBack()}
          size={25}
        />
      ),
    });
  });
  return (
    <View>
      <Button
        text="Chat"
        accLabel="Chat"
        accHint="Navigates to the screen with the given name"
        accRole="button"
        onPress={() => navigation.navigate("ChatScreen")}
      ></Button>
      <Button
        text="FAQs"
        accLabel="FAQs"
        accHint="Navigates to the screen with the given name"
        accRole="button"
        onPress={() => navigation.navigate("FaqScreen")}
      ></Button>
      <Button
        text="Tutoriales"
        accLabel="Tutorials"
        accHint="Navigates to the screen with the given name"
        accRole="button"
        onPress={() => navigation.navigate("TutorialScreen")}
      ></Button>
    </View>
  );
}

export default MainList;
