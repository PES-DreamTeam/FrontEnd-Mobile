import React from "react";
import { StyleSheet, Pressable, View, Image, Text, Linking } from "react-native";
import CustomButton from "../../../../utils/button";


function HighlightInfo (props) {
    const customStyle = require("../../../../utils/customStyleSheet");

    console.log(props.phone);
    return (
        <View style={styles.highlightContent}>
            <View style={styles.highlightContentWeb}>
                <CustomButton
                    onPress={() => {
                        Linking.openURL(`${'https://www.tesla.com/es_es'}`)
                    }}
                    imageSrc={require('../../../../../assets/images/icons/website.png')}
                    imageStyle={{width: 80, height: 80, alignSelf: 'center'}}
                    customStyles={{backgroundColor: 'transparent', width: 30, height: 40, alignSelf: 'center', right: 0}}
                />
            </View>
            <View style={styles.highlightContentPhone}>
                <CustomButton
                    onPress={() => {
                        Linking.openURL(`tel:${932201427}`)
                    }}
                    imageSrc={require('../../../../../assets/images/icons/call.png')}
                    imageStyle={{width: 60, height: 60, alignSelf: 'center'}}
                    customStyles={{backgroundColor: 'transparent', width: 30, height: 40, alignSelf: 'center', right: 0}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    highlightContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        maxWidth: "90%",
        marginBottom: 10,
    },
    highlightContentWeb: {
        display: "flex",
        flexDirection: "column",
        width: "47%",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#eae4f6",
        height: "80%",
        borderWidth: 2,
        borderRadius: 20,
    },
    highlightContentPhone: {
        display: "flex",
        flexDirection: "column",
        width: "47%",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#eae4f6",
        height: "80%",
        borderWidth: 2,
        borderRadius: 20,
    },
});

export default HighlightInfo;