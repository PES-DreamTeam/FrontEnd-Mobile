import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import useAuth from '../../hooks/useAuth';
import Modal from '../../utils/modal';
import useUserSettings from '../../hooks/useUserSettings';
import Button from '../../utils/button';
import i18n from 'i18n-js';
function SettingsScreen() {

    const { deleteAccount } = useAuth();
    const { setLanguage, language } = useUserSettings();
    const [isModalVisible, setIsModalVisible] = useState(false);

    return(
        <>
            <View style={styles.container}>
                <Text>{i18n.t('settings.subtitle')}</Text>
                
                <View style={styles.languageButtons}>
                    <View style={styles.button}>
                        <Button
                            text={i18n.t('settings.setES')}
                            onPress={() => setLanguage('es')}
                            customStyles={[language === "es" ? styles.selectedLanguageButton : {}]}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            text= {i18n.t('settings.setEN')}
                            onPress={() => setLanguage('en')}
                            customStyles={[language === "en" ? styles.selectedLanguageButton : {}]}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            text={i18n.t('settings.setCAT')}
                            onPress={() => setLanguage('cat')}
                            customStyles={[language === "cat" ? styles.selectedLanguageButton : {}]}
                        />
                    </View>
                </View>

                <View style={[styles.deleteAccountContainer]}>
                    <Button
                        text={i18n.t('settings.deleteAccount')}
                        onPress={() => setIsModalVisible(!isModalVisible)}
                    />
                </View>

                <Modal
                    isVisible={isModalVisible}
                    handleAccept={()=>{
                        setIsModalVisible(!isModalVisible);
                        deleteAccount();
                    }} 
                    onPress={()=> setIsModalVisible(!isModalVisible)}
                    title={i18n.t('settings.deleteAccountTitle')}
                    subtitle={i18n.t('settings.deleteAccountSubtitle')}
                />
                
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
    },
    languageButtons: {
        margin:20,
        width: '50%',
        alignSelf: 'center',
    },
    button: {
        margin: 10,
    },
    deleteAccountContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    selectedLanguageButton: {
        backgroundColor: '#006fc7',
        borderColor: 'black',
        borderWidth: 3,
    }
})

export { SettingsScreen }