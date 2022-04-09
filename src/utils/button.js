import { TouchableOpacity, Text, StyleSheet } from "react-native"
import i18n from "i18n-js"
export default ({onPress, text, customStyles, disabled}) => {
    return(
        <TouchableOpacity
            style={[styles.button, customStyles]}
            onPress={onPress}
            disabled={disabled}
        >
            {
                text ?
                <Text style={{color: "white"}}>{text}</Text>
                :
                <Text style={{color: "white"}}>
                    {i18n.t('miscelaneus.accept')}
                </Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#2196F3',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',	
    }
})