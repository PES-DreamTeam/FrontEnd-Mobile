import React, { Component } from 'react';
import { CircularColorBtn  } from './circularColorBtn';
import { View, StyleSheet} from 'react-native';

const CircularColorBtnList = ({carColors, onChangeColor, currentSelected}) => {
    return (
        <View style={[styles.circularButtonContainer]}>
            {
                Object.getOwnPropertyNames(carColors).map(color => 
                    <CircularColorBtn 
                        color= {carColors[color]}
                        onPress={() => onChangeColor(carColors[color])}
                        key={carColors[color]}
                        isSelected={currentSelected==carColors[color]}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    circularButtonContainer: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    }
})

export default CircularColorBtnList;

