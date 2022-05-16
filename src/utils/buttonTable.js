import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from './button';
import i18n from 'i18n-js';

export default ({buttonsInfo, rowSize, currentSelected, handleOnSelect, }) => {
    
    const customStyle = require('./customStyleSheet');

    var buttons = [];
    var table=[];
    for(let i = 0; i < 1 + buttonsInfo?.length / rowSize; i++){
        buttons.push([]);
        for(let j = 0; j < Math.min(3, buttonsInfo?.length - i * rowSize); j++) {
            buttons[i].push(
                <CustomButton
                    key={i*rowSize+j}
                    customStyles={[styles.tableButton, 
                        {width: 90.00 / parseFloat(rowSize) + "%",
                        marginRight: 15,},
                        currentSelected == i*rowSize+j ? {borderColor: "blue"} : null]
                    }
                    
                    text={buttonsInfo[i*rowSize+j].text}
                    textStyle={[customStyle.formSelectableButtonText, {fontSize: 12}]}
                    imageSrc={buttonsInfo[i*rowSize+j].imageSrc}
                    imageStyle={buttonsInfo[i*rowSize+j].imageStyle}
                    onPress={buttonsInfo[i*rowSize+j].onPress}
                />
            );
        }

        table.push(
            <View 
                key={i}
                style={styles.row}>
                
                {buttons[i]}
            </View>
        )

    }


    return(
        <View style={{marginTop: 10}}>
            {table}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    tableButton: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        backgroundColor: '#eee',
        alignSelf: "center",
        flexDirection: "row",
        padding: 10,
    },
})
