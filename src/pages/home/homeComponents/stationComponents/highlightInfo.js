import React, {useEffect, useState} from "react";
import { StyleSheet, Pressable, View, Image, Text, Linking } from "react-native";
import CustomButton from "../../../../utils/button";
import useUserSettings from "../../../../hooks/useUserSettings";
import useHighlights from "../../../../hooks/useHighlights";

function HighlightInfo (props) {
    const customStyle = require("../../../../utils/customStyleSheet");
    useUserSettings();

    const [stationInfo, setStationInfo] = useState(null);

    const { getHighlightById } = useHighlights();


    useEffect(async () => {
        if(props?.stationInfo != null && props?.stationInfo != undefined && props?.stationInfo?.id != null && props?.stationInfo?.id != undefined) { 
            const response = await getHighlightById(props?.stationInfo?.id);
            if(response != null && response != undefined && response?.data != null && response.data != undefined) {
                setStationInfo(response?.data);
            } 
        }
    }, [props?.stationInfo]);

    return (
        <View style={styles.highlightContent}>
            <View style={styles.highlightContentWeb}>
                <CustomButton
                    onPress={() => {
                        stationInfo.website == ""
                        ? null
                        : Linking.openURL(`${stationInfo?.website}`);
                    }}
                    imageSrc={require('../../../../../assets/images/icons/website.png')}
                    imageStyle={{width: 80, height: 80, alignSelf: 'center'}}
                    customStyles={{backgroundColor: 'transparent', width: 30, height: 40, alignSelf: 'center', right: 0}}
                />
            </View>
            <View style={styles.highlightContentPhone}>
                <CustomButton
                    onPress={() => {stationInfo?.phone == ""
                    ? null
                    : Linking.openURL(`tel:${stationInfo?.phone}`)
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