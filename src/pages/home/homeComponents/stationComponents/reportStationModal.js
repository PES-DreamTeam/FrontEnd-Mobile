import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../../../../utils/button';
import useChargePoints from "../../../../hooks/useChargePoints";
import i18n from 'i18n-js';

export default ({isVisible, handleCancel, handleAccept, title, subtitle, stationID, stationType}) => {
    const [ selectedType, setSelectedType ] = useState ("dislike");
    const [ reportMessage, changeReportMessage] = useState("");

    const reset = () => {
        setSelectedType("dislike");
        changeReportMessage("");
    }

    const {sendReport} = useChargePoints(); 

    const send = async () => {
        await sendReport(stationID, selectedType, reportMessage, stationType);
        reset();
        handleAccept();
    }

    const cancel = () => {
        reset();
        handleCancel();
    }
    
    const customStyle = require("../../../../utils/customStyleSheet");

    return(
        <Modal isVisible={isVisible}>
            <View style={[customStyle.modalContainer, {justifyContent: "space-between"}]}>
                <View style={[customStyle.coolBlockTitleContainer, {width: "100%"}]}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {title}
                    </Text>
                </View>
                {subtitle ?
                    <View style={styles.modalSubtitle}>
                        <Text style={{fontSize: 15}}>
                            {subtitle}
                        </Text>
                    </View>               
                    :null
                }
                <View style={[styles.reportTypeContainer, {width: "80%"}]}>
                    <CustomButton
                        customStyles={selectedType=='dislike'? styles.reportTypeButtonSelected : styles.reportTypeButton}
                        onPress={() => setSelectedType("dislike")}
                        text={i18n.t('report.reportStation.dislike')}
                    />
                    <CustomButton
                        customStyles={selectedType=='poorCondition'? styles.reportTypeButtonSelected : styles.reportTypeButton}
                        onPress={() => setSelectedType("poorCondition")}
                        text={i18n.t('report.reportStation.poorCondition')}
                    />
                    <CustomButton
                        customStyles={selectedType=='badInformation'? styles.reportTypeButtonSelected : styles.reportTypeButton}
                        onPress={() => setSelectedType("badInformation")}
                        text={i18n.t('report.reportStation.badInformation')}
                    />
                </View>
                <TextInput
                    onChangeText={(text) => changeReportMessage(text)}
                    value={reportMessage}
                    style={[customStyle.formInputText, {width: "80%"}]}
                    name="reportMessage"
                    placeholder= {i18n.t('report.reportStation.placeholder')}
                />


                <View style={[customStyle.buttonRow, {height: "12%", marginBottom: 15}]}>                    
                    {
                        handleCancel ?
                        <CustomButton
                            customStyles={styles.cancelButton}
                            onPress={() => cancel()}
                            text={i18n.t('miscelaneus.cancel')}
                        />
                        : null
                    }
                    
                    <CustomButton
                        customStyles={styles.acceptButton}
                        onPress={() => send()}
                        text={i18n.t('report.send')}
                    />
                    
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: '100%',
        height: 350,
        borderRadius: 20,
        padding: 20,
        // backgroundColor: 'red'
    },
    modalTitle:{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    modalSubtitle:{
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        bottom: 0,
        height: 40,
        // backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: '#de3e44',
        width: "45%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    acceptButton: {
        backgroundColor: '#2e942b',
        width: "45%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    reportTypeContainer: {
        justifyContent: 'space-around',
        borderRadius: 10,
        height: 150,
        alignItems: 'center',
    },
    reportTypeButton: {
        backgroundColor: '#dbcafc',
        width: "100%",
        height: "30%",
        borderRadius: 10,
    },
    reportTypeButtonSelected: {
        height: "30%",
        borderRadius: 10,
        backgroundColor: "#c0a2fc",
        borderColor: "#b28dfc",
        borderWidth: 3,
    },
})