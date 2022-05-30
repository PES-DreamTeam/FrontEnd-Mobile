import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../../../utils/button';
import i18n from 'i18n-js';

export default ({isVisible, handleCancel, handleAccept}) => {
    const [ autonomyValue, setAutonomyValue] = useState("");

    const reset = () => {
        setAutonomyValue("");
    }

    useEffect(() => {
        if (autonomyValue.includes(",")) {
            setAutonomyValue(autonomyValue.replace(",","."))
        }
    }, [autonomyValue]);

    const accept = () => {
        let temp = autonomyValue;
        if(autonomyValue <= 0 || autonomyValue.length == '' || isNaN(autonomyValue) || 
            autonomyValue == null || autonomyValue == undefined) {
            temp = 10000;
        }
        handleAccept(temp);
        reset();
    }

    const cancel = () => {
        reset();
        handleCancel();
    }
    
    const customStyle = require("../../../utils/customStyleSheet");

    return(
        <Modal isVisible={isVisible}>
            <View style={[customStyle.modalContainer, {justifyContent: "space-between"}]}>
                <View style={[customStyle.coolBlockTitleContainer, {width: "100%"}]}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {i18n.t('autonomyModal.title')}
                    </Text>
                </View>
                <TextInput
                    onChangeText={(text) => setAutonomyValue(text)}
                    value={autonomyValue}
                    style={[customStyle.formInputText, {width: "80%", textAlignVertical: "center"}]}
                    name="autonomyValue"
                    placeholder= {i18n.t('autonomyModal.placeholder')}
                    keyboardType="numeric"
                />


                <View style={[customStyle.buttonRow, {height: "15%", marginBottom: 15}]}>                    
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
                        onPress={() => accept()}
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