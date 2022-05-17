import { ChatScreen } from "./helpScreens/chatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import FaqScreen from "./helpScreens/faqScreen";
import MainList from "./helpScreens/mainList";
import Icon from "react-native-vector-icons/Ionicons";
import TutorialScreen from "./helpScreens/tutorialScreen";


function HelpScreen({navigation}){
    const Stack = createStackNavigator();
    return( 
    
    <Stack.Navigator initialRouteName="MainList"  >
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
            title:"Soporte tecnico"
        }} />
        <Stack.Screen name="FaqScreen" component={FaqScreen} options={{
            title:"FAQ"
        }} />
        <Stack.Screen name="MainList" component={MainList}  options={{
            title:"Sección de ayuda"
        }} />
        <Stack.Screen name="TutorialScreen" component={TutorialScreen}  options={{
            title:"Tutoriales"
        }} />
    </Stack.Navigator>
    )

};
export default  HelpScreen ;