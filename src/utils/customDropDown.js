import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import i18n from "i18n-js"
import CustomButton from "./button"
import SelectableOptionModal from "./selectableOptionModal"

export default ({changeSelected, options, currentSelected}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const customStyle = require('./customStyleSheet');

    
    const onChangeSelected = (option) => {
        setModalOpened(false);
        changeSelected(option);
    }
    
    return (
        <View>
            <CustomButton
                onPress={() => setModalOpened(options?.length > 0)}
                text={currentSelected}
                textStyle={[customStyle.formSelectableButtonText]}
                customStyles={customStyle.formSelectableButton}
                imageSrc={require('../../assets/images/down-arrow.png')}
                imageStyle= {{width: 20, height: 20}}
            />
            { modalOpened ?
                <SelectableOptionModal
                    isVisible={modalOpened}
                    handleOnSelect= {onChangeSelected}
                    options={options}
                />
            : null }
        </View>

    )
}