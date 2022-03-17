import React, { Component } from 'react';
import { CircularColorBtn  } from './circularColorBtn';
import { View, StyleSheet} from 'react-native';

const CircularColorBtnList = ({carColors, onChangeColor}) => {

    return (
        <View style={[styles.circularButtonContainer]}>
            {
                Object.getOwnPropertyNames(carColors).map(color => 
                    <CircularColorBtn 
                        color= {carColors[color]}
                        onPress={onChangeColor}
                        key={carColors[color]}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    circularButtonContainer: {
        width: 225,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    }
})

export { CircularColorBtnList };

