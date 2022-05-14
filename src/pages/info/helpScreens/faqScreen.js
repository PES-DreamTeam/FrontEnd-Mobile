import { Text, View } from "react-native";
import { useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

function FaqScreen({navigation}){
    useEffect(()=>{
        navigation.setOptions({headerLeft: () =>(
            <Icon name="arrow-back-outline" onPress={() => navigation.goBack()} size={25} />
    )})
    })
    return (
        <View>
            <Text>
                ¿Habrá mas servicios dentro de EcoRoads?
                

            </Text>
        </View>
    )
}

export default FaqScreen;