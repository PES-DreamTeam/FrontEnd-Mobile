import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomButton from "../../../utils/button";
import Icon from "react-native-vector-icons/Ionicons";


function MainList({navigation}){

    const customStyle = require('../../../utils/customStyleSheet');

    useEffect(()=>{
        navigation.setOptions({headerLeft: () =>(
            <Icon name="arrow-back-outline" onPress={() => navigation.goBack()} size={25}  />
    )})
    })
    return (
        <View style={[customStyle.mainContainer, {height: '100%'}]}>
            <View style={[customStyle.coolBlockContainer, styles.blockStyle]}>
                <CustomButton 
                    customStyles={styles.buttonStyle}
                    onPress={() => navigation.navigate('ChatScreen')}
                    imageSrc={require('../../../../assets/images/icons/messenger.png')}
                    imageStyle={{height: "80%", aspectRatio: 1}}
                />
                <Text style={[customStyle.bigTitle, styles.textStyle]}>Chat</Text>
            </View>
            <View style={[customStyle.coolBlockContainer, styles.blockStyle]}>
                <CustomButton 
                    customStyles={styles.buttonStyle}
                    onPress={() => navigation.navigate('FaqScreen')}
                    imageSrc={require('../../../../assets/images/icons/question.png')}
                    imageStyle={{height: "80%", aspectRatio: 1}}
                />
                <Text style={[customStyle.bigTitle, styles.textStyle]}>FAQ</Text>
            </View>
            <View style={[customStyle.coolBlockContainer, styles.blockStyle]}>
                <CustomButton 
                    customStyles={styles.buttonStyle}
                    onPress={() => navigation.navigate('TutorialScreen')}
                    imageSrc={require('../../../../assets/images/icons/mortarboard.png')}
                    imageStyle={{height: "80%", aspectRatio: 1}}
                />
                <Text style={[customStyle.bigTitle, styles.textStyle]}>Tutorial</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    blockStyle: {
        height: '30%',
    },
    buttonStyle: {
        height: '75%',
        backgroundColor: 'transparent',
    },
    textStyle: {
        height: '25%', 
        textAlign: 'center', 
        textAlignVertical: 'center',
        backgroundColor: '#f3edff',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
});

export default MainList;