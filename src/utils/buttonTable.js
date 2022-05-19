import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from './button';
import i18n from 'i18n-js';

export default ({buttonsInfo, rowSize, currentSelected, handleOnSelect, deleteable, 
    onDeleteElement }) => {
    
    const customStyle = require('./customStyleSheet');

    var buttons = [];
    var table=[];
    for(let i = 0; i < 1 + buttonsInfo?.length / rowSize; i++){
        buttons.push([]);
        for(let j = 0; j < Math.min(3, buttonsInfo?.length - i * rowSize); j++) {
            let tempButton = [];
            
            tempButton.push(
                    <CustomButton
                        key={i*rowSize+j}
                        customStyles={[styles.tableButton, 
                            {width: '100%',
                            },
                            currentSelected == i*rowSize+j ? {borderColor: "blue"} : null]
                        }
                        
                        text={buttonsInfo[i*rowSize+j].text}
                        textStyle={[customStyle.formSelectableButtonText, {fontSize: 12}]}
                        imageSrc={buttonsInfo[i*rowSize+j].imageSrc}
                        imageStyle={buttonsInfo[i*rowSize+j].imageStyle}
                        onPress={buttonsInfo[i*rowSize+j].onPress}
                    /> 
            )
            if(deleteable && buttonsInfo[i*rowSize+j].canBeDeleted) {
                tempButton.push(
                <CustomButton
                    key={i*rowSize+j+500}
                    customStyles={styles.deleteButton}
                    text={'-'}
                    onPress={() => onDeleteElement(i*rowSize+j)}
                />
                )
            }

            let tempView = [
                <View style={[styles.tableButtonContainer, 
                    {
                        width: 90.00 / parseFloat(rowSize) + "%",
                        height: '100%',
                    }]}
                    key={i*rowSize+j}>
                    {tempButton}
                </View>
            ]
            
            buttons[i].push(tempView);
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
        marginBottom: 10,
    },
    tableButtonContainer: {
        height: '90%',
        width: '90%',
        marginRight: 15,
        flexDirection: 'column-reverse',
    },
    tableButton: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        backgroundColor: '#eee',
        alignSelf: "center",
        flexDirection: 'column',
        padding: 10,
    },
    deleteButton: {
        width: 25, 
        height: 25, 
        alignSelf: 'flex-end', 
        marginBottom: -15,
        backgroundColor: 'red',
        textAlign: 'center',
        justifyContent: 'center',
    },
})
