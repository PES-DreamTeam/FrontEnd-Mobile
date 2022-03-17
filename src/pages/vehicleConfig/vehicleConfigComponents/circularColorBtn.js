import React, { Component } from 'react';
import { Pressable, StyleSheet  } from 'react-native';

const CircularColorBtn = ({color, onPress}) => {
    return (
        <Pressable 
            onPress={() => onPress(color)}
            style={[styles.circularButton, {backgroundColor: color}]} />
    );
}

const styles = StyleSheet.create({
    circularButton: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
        borderRadius: 30,
    }
})

export { CircularColorBtn };