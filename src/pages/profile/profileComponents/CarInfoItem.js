import React from "react";
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';

export default CarInfoItem = ({item}) => {
    const {width} = useWindowDimensions();


    var vehicleImages = [
        require( '../../../../assets/images/carTypes/carType_0.png'),
        require( '../../../../assets/images/carTypes/carType_1.png'),
        require( '../../../../assets/images/carTypes/carType_2.png'),
        require( '../../../../assets/images/carTypes/carType_3.png'),
        require( '../../../../assets/images/carTypes/carType_4.png'),
        require( '../../../../assets/images/carTypes/carType_5.png'),
    ]

    if(item.vehicleType === undefined){
        item.vehicleType = 0;
    }
    
    return (
        <View style ={[styles.container]}>
            <Image source = {vehicleImages[item.vehicleType]} style={[styles.image, {tintColor: item.color}, {width, resizeMode: 'contain'}, ]} />
            <View>
                <Text style= {[styles.title]}>{item.brand} {item.model}</Text>
                <Text style= {[styles.text]}>Nickname: "{item.nickname}"</Text>
                <Text style= {[styles.text]}>Number Plate: {item.numberPlate}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 5,
    },
});