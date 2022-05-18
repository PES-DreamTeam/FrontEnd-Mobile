import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import Button from './button';
import i18n from 'i18n-js';

export default ({isVisible, handleCancel, handleAccept, title, subtitle}) => {

    return(
        <Modal isVisible={isVisible}>
            <View style={styles.modal}>
                <View style={styles.modalTitle}>
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


                <View style={styles.modalButtons}>     
                    {
                        handleCancel ?
                        <Button
                            customStyles={styles.cancelButton}
                            onPress={handleCancel}
                            text={i18n.t('miscelaneus.cancel')}
                        />
                        : null
                    }               
                    <Button
                        customStyles={styles.acceptButton}
                        onPress={handleAccept}
                        text={i18n.t('miscelaneus.accept')}
                    />
                    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: '100%',
        height: '50%',
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
