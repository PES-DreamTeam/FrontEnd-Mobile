import { View, Text, Button, StyleSheet } from 'react-native'
import useAuth from '../../hooks/useAuth';
import useUserSettings from '../../hooks/useUserSettings';

function SettingsScreen() {

    const { signOut } = useAuth();
    const { setLanguage } = useUserSettings();
    
    return(
        <View style={styles.container}>
            <Text>Welcome to the settings screen</Text>
            <Button
                title="LogOut"
                onPress={() => signOut()}
            />
            <View style={styles.languageButtons}>
                <View style={styles.button}>
                    <Button
                        title="Set EN"
                        onPress={() => setLanguage('en')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Set SP"
                        onPress={() => setLanguage('es')}
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