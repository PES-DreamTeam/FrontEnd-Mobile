import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import useAuth from '../../hooks/useAuth';
import useUserSettings from '../../hooks/useUserSettings';
import i18n from 'i18n-js';
function SettingsScreen() {

    const { signOut } = useAuth();
    const { setLanguage } = useUserSettings();

    return(
        <View style={styles.container}>
            <Text>{i18n.t('settings.subtitle')}</Text>
            <Button
                title= {i18n.t('settings.logOut')}
                onPress={() => signOut()}
            />
            <View style={styles.languageButtons}>
                <View style={styles.button}>
                    <Button
                        title={i18n.t('settings.setES')}
                        onPress={() => setLanguage('es')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title= {i18n.t('settings.setEN')}
                        onPress={() => setLanguage('en')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title={i18n.t('settings.setCAT')}
                        onPress={() => setLanguage('cat')}
                    />
                </View>
            </View>

        </View>
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
    }
})

export { SettingsScreen }