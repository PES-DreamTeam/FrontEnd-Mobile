import { TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import i18n from "i18n-js"
export default ({onPress, text, textStyle, customStyles, disabled, imageSrc, imageStyle}) => {
    const customStyle = require('./customStyleSheet');
    
    return(
        <TouchableOpacity
            style={[styles.button, customStyles]}
            onPress={onPress}
            disabled={disabled}
            imageSrc={imageSrc}

        >
            {
                text ?
                <Text style={!textStyle? customStyle.submitButtonText : textStyle}>{text}</Text>
                :
                null
            }
            {
                imageSrc ? 
                <Image source={imageSrc} style={imageStyle}/>
                :
                null
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