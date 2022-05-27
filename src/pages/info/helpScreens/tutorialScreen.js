import { Text, View } from "react-native";
import { useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

function TutorialScreen({navigation}){
    useEffect(()=>{
        navigation.navigate('OnBoarding')
        navigation.setOptions({headerLeft: () =>(
            <Icon name="arrow-back-outline" onPress={() => navigation.goBack()} size={25} />
        )})
    })
    return (
        null
    )
}

export default TutorialScreen;