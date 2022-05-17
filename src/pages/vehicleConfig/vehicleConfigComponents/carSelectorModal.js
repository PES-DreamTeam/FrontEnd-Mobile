import React, { useState } from "react";
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import i18n from 'i18n-js';
import CustomButton from '../../../utils/button'
import Modal from 'react-native-modal';
import CircularColorBtnList from './circularColorBtnList'

export default CarSelectorModal = ({vehicleType, isVisible, onHandleAccept, onHandleCancel}) => {
    
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
        White:  '#DDDDDD',
        Grey:   '#4E4E4E',
        Black:  '#222222',
        Red:    '#871614', 
        Blue:   '#16345D',
        Yellow: '#FDCC0D',
        Green:  '#296E01'
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
            <View style={[customStyle.modalContainer, {height: "65%", marginBottom: 20}]}>
                <Text style={customStyle.bigTitle}>
{/*                     {vehicleInfo.brand} {vehicleInfo.model}
*/}                </Text>
                <Image
                    source={vehicleImages[vehicleType]}
                    style={{width: 250, height: 100, alignSelf: 'center', tintColor: vehicleColors[vehicleType]}}
                />
                <Text style={[customStyle.formInputTitle]}> {i18n.t('vehicleConfig.vehicleColor')}</Text>
                <CircularColorBtnList
                    carColors = {carColors}
                    onChangeColor = {onChangeColor}
                    currentSelected = {vehicleColors[vehicleType]}
                />
                <View styles={customStyle.buttonRow}>    
                    <CustomButton
                        onPress={() => onHandleAccept(vehicleColors[vehicleType])}
                        text={i18n.t('miscelaneus.accept')}
                        />
                    <CustomButton
                        onPress={() => onHandleCancel()}
                        text={i18n.t('miscelaneus.cancel')}
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