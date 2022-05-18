import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from './button';
import i18n from 'i18n-js';

export default ({isVisible, handleOnSelect, options}) => {
    
    const customStyle = require('./customStyleSheet');

    return(
        <Modal isVisible={isVisible}>
            <View style={customStyle.modalContainer}>
                <ScrollView style={customStyle.modalContentContainerScrollable}>
                    {
                        options?.map((option, index) => 
                        <CustomButton
                            key={index}
                            onPress={() => handleOnSelect(option)}
                            customStyles={customStyle.dropDownModalButton}
                            text={option}
                            textStyle={customStyle.formSelectableButtonText}
                        />
                        )
                    }
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    
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
        height: 40,
        // backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
        width: "45%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    acceptButton: {
        backgroundColor: 'green',
        width: "45%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})
