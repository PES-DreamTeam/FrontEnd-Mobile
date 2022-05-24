import { TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import i18n from "i18n-js"
export default ({onPress, text, customStyles, disabled, imageSrc, imageWidth, imageHeight, accLabel, accHint, accRole}) => {
    return(
        <TouchableOpacity
            style={[styles.button, customStyles]}
            onPress={onPress}
            disabled={disabled}
            imageSrc={imageSrc}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            accessibilityLabel={accLabel}
            accessibilityHint={accHint}
            accessibilityRole={accRole}

        >
            {
                text ?
                <Text style={{color: "white"}}>{text}</Text>
                :
                null
            }
            {
                imageSrc ? 
                <Image source={imageSrc} style={{width: imageWidth, height: imageHeight}}/>
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