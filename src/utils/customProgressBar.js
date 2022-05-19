import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import i18n from "i18n-js"
export default ({text, textStyle, percent, backgroundStyle, fillStyle}) => {
    const customStyle = require('./customStyleSheet');
    
    return(
        <View style={[customStyle.progressBarBackground, backgroundStyle]}>
            <View style={[customStyle.progressBarFill, fillStyle, {width: percent + '%'}]}>
                <Text style={[customStyle.progressBarInternalText, textStyle]}>
                    {text}
                </Text>
            </View>
        </View>
    )
}