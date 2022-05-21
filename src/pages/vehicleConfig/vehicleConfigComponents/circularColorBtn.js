import React, { Component } from 'react';
import { Pressable, StyleSheet  } from 'react-native';
import CustomButton from '../../../utils/button';

const CircularColorBtn = ({color, onPress, isSelected}) => {
    return (
        <CustomButton 
            onPress={() => onPress(color)}
            customStyles={[isSelected ? styles.circularButtonSelected : styles.circularButton, {backgroundColor: color}]} 

        />
    );
}

const styles = StyleSheet.create({
    circularButton: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        borderRadius: 30,
    },
    circularButtonSelected: {
        width: 70,
        height: 70,
        marginHorizontal: 5,
        borderRadius: 35,
        borderColor: 'black',
        borderWidth: 3,
    }
})

export { CircularColorBtn };