import React, { useState, Component } from 'react';
import { View, Text, Pressable, StyleSheet, Image  } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CarTypeSelector = (props) => {
    const [carImages, setCarImages] = useState(
        [   require( '../../../../assets/images/carTypes/carType_0.png'),
            require( '../../../../assets/images/carTypes/carType_1.png'),
            require( '../../../../assets/images/carTypes/carType_2.png'),
            require( '../../../../assets/images/carTypes/carType_3.png'),
            require( '../../../../assets/images/carTypes/carType_4.png'),
            require( '../../../../assets/images/carTypes/carType_5.png'),
            require( '../../../../assets/images/carTypes/carType_6.png'),
            require( '../../../../assets/images/carTypes/carType_7.png'),
            require( '../../../../assets/images/carTypes/carType_8.png'),
        ]
    );

    const renderCarImage = ({item, index}) => {
        return (
            <Image
                source={item}
                style={{tintColor: props.vehicleColor}}
            />
        )
    }

    return (
        <View style={styles.carTypeContainer}>
            <Carousel
                data={carImages}
                renderItem={renderCarImage}
                sliderWidth={320}
                sliderHeight={128}
                itemWidth={320}
                itemHeight={128}
                keyExtractor={(item,index) => index}
                onSnapToItem={props.onSnapToItem}
                selectedItem={props.currentSelected}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    carTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 320,
        height: 128,
        marginBottom: 10,
    },
})

export { CarTypeSelector };