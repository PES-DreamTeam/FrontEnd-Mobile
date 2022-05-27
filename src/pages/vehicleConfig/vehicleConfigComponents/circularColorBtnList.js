import React, { Component } from 'react';
import { CircularColorBtn  } from './circularColorBtn';
import { View, StyleSheet} from 'react-native';

const CircularColorBtnList = ({carColors, onChangeColor, currentSelected}) => {
    const carColorArray = Object.keys(carColors);
    const firstHalf = carColorArray.slice(0, carColorArray.length/2);
    const secondHalf = carColorArray.slice(carColorArray.length/2, carColorArray.length);
    return (
        <View style={styles.container}>
            <View style={[styles.circularButtonContainer]}>
                {
                    firstHalf.map(color => 
                        <CircularColorBtn 
                            color= {carColors[color]}
                            onPress={() => onChangeColor(carColors[color])}
                            key={carColors[color]}
                            isSelected={currentSelected==carColors[color]}
                        />
                    )
                }
            </View>
            <View style={[styles.circularButtonContainer]}>
                {
                    secondHalf.map(color => 
                        <CircularColorBtn 
                            color= {carColors[color]}
                            onPress={() => onChangeColor(carColors[color])}
                            key={carColors[color]}
                            isSelected={currentSelected==carColors[color]}
                        />
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    circularButtonContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    container: {
        height: '40%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10, 
    },
})

export default CircularColorBtnList;

