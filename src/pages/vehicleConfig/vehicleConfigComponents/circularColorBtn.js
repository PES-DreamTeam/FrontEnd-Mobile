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
        width: '20%',
        aspectRatio: 1,
        marginHorizontal: 5,
        borderRadius: 30,
    },
    circularButtonSelected: {
        width: '25%',
        aspectRatio: 1,
        marginHorizontal: 5,
        borderRadius: 35,
        borderColor: 'black',
        borderWidth: 3,
    }
})

export { CircularColorBtn };