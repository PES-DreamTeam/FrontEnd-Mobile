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
        width: 30,
        height: 30,
        marginHorizontal: 5,
        borderRadius: 30,
    },
    circularButtonSelected: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
        borderRadius: 30,
        borderColor: 'blue',
        borderWidth: 2,
        marginBottom: 20,
    }
})

export { CircularColorBtn };