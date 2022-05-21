import React, { useState } from "react";
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import i18n from 'i18n-js';
import CustomButton from '../../../utils/button'
import Modal from 'react-native-modal';
import CircularColorBtnList from './circularColorBtnList'

export default CarSelectorModal = ({vehicleType, isVisible, onHandleAccept, onHandleCancel, vehicleBrand}) => {
    const customStyle = require('../../../utils/customStyleSheet');

    var vehicleImages = [
        require( '../../../../assets/images/carTypes/carType_0.png'),
        require( '../../../../assets/images/carTypes/carType_1.png'),
        require( '../../../../assets/images/carTypes/carType_2.png'),
        require( '../../../../assets/images/carTypes/carType_3.png'),
        require( '../../../../assets/images/carTypes/carType_4.png'),
        require( '../../../../assets/images/carTypes/carType_5.png'),
        require( '../../../../assets/images/carTypes/carType_6.png'),
        require( '../../../../assets/images/carTypes/carType_7.png'),
        require( '../../../../assets/images/carTypes/carType_8.png'),
    ]

    const carColors = { 
        Cyan:       '#66c5db',
        Black:      '#565656',
        Blue:       '#7191bb',
        Yellow:     '#fad616', 
        Red:        '#e2350a',
        Purple:     '#bfa3cf',
        White:      '#c6c6c6',
        Green:      '#218443',
    };

    const [vehicleColors, setVehicleColors] = useState([
        carColors.Black,
        carColors.Black,
        carColors.Black,

        carColors.Black,
        carColors.Black,
        carColors.Black,

        carColors.Black,
        carColors.Black,
        carColors.Black,
    ]);


    
    const onChangeColor = (color) => {
        let temp = JSON.parse(JSON.stringify(vehicleColors));
        temp[vehicleType] = color;
        setVehicleColors(temp);
    }
    
    return (
        <Modal isVisible={isVisible}>
            <View style={[customStyle.coolBlockContainer, {width: '100%', justifyContent: 'space-between', marginBottom: 20}]}>
                <View style={[customStyle.coolBlockTitleContainer, ]}>
                    <Text style={customStyle.bigTitle}>
                        {i18n.t('vehicleConfig.customize')} {(vehicleBrand == '') ? i18n.t('miscelaneus.vehicleWord') : vehicleBrand}
                    </Text>
                </View>
                
                <Image
                    source={vehicleImages[vehicleType]}
                    style={{width: 250, height: 100, alignSelf: 'center', tintColor: vehicleColors[vehicleType]}}
                />
                <View style={[customStyle.coolBlockContainer]}>
                    <Text style={[customStyle.formInputTitle, {fontSize: 25, color: 'black', marginVertical: 10, textAlign: 'center', textDecorationLine: 'underline'}]}>{i18n.t('vehicleConfig.vehicleColor')}:</Text>
                    <CircularColorBtnList
                        carColors = {carColors}
                        onChangeColor = {onChangeColor}
                        currentSelected = {vehicleColors[vehicleType]}
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-around', width: '100%'}}>
                    <CustomButton
                        onPress={() => onHandleCancel()}
                        text={i18n.t('miscelaneus.cancel')}
                        customStyles={[customStyle.button, {marginVertical: 20, width: '40%', alignSelf: 'center', backgroundColor: '#e2350a', borderColor: '#ba2b07', borderWidth: 3}]}
                    />

                    <CustomButton
                        onPress={() => onHandleAccept(vehicleColors[vehicleType])}
                        customStyles={[customStyle.button, {marginVertical: 20, width: '40%', alignSelf: 'center', backgroundColor: '#29a353', borderColor: '#218443', borderWidth: 3}]}
                        text={i18n.t('miscelaneus.accept')}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        marginTop: '5%',
        width: '100%',
        textAlign: 'left',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    textContainer: {
        width: '75%',
    },
    image: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageC: {  
        position:'absolute',
        marginRight: 95,
        marginTop:30,
        left:60,
        top: -10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 3,
    },
    titleD: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 3,
        color:'green'
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    deleteButton: {
        width : 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#c72b20',
    },
    buttonContainer: {
        width: '20%',
        flexDirection: 'column',
        alignItems: 'flex-end',
    }
});