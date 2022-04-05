import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import useAuth from '../../hooks/useAuth';
import Modal from '../../utils/modal';
import useUserSettings from '../../hooks/useUserSettings';
import Button from '../../utils/button';
import i18n from 'i18n-js';
function SettingsScreen() {

    const { signOut, deleteAccount } = useAuth();
    const { setLanguage } = useUserSettings();
    const [isModalVisible, setIsModalVisible] = useState(false);
    return(
        <>
            <View style={styles.container}>
                <Text>{i18n.t('settings.subtitle')}</Text>
                <Button
                    text={i18n.t('settings.logOut')}
                    onPress={() => signOut()}
                />
                
                <View style={styles.languageButtons}>
                    <View style={styles.button}>
                        <Button
                            text={i18n.t('settings.setES')}
                            onPress={() => setLanguage('es')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            text= {i18n.t('settings.setEN')}
                            onPress={() => setLanguage('en')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            text={i18n.t('settings.setCAT')}
                            onPress={() => setLanguage('cat')}
                        />
                    </View>
                </View>

                <View style={[styles.deleteAccountContainer]}>
                    <Button
                        text={"Borrar cuenta"}
                        onPress={() => setIsModalVisible(!isModalVisible)}
                    />
                </View>

                <Modal
                    isVisible={isModalVisible}
                    handleAccept={()=>{
                        deleteAccount();
                        setIsModalVisible(!isModalVisible);
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

})

export { SettingsScreen }