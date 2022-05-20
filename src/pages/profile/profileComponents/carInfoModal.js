import React from "react";
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import i18n from 'i18n-js';
import CustomButton from '../../../utils/button'
import Modal from 'react-native-modal';
import useVehicleConfig from "../../../hooks/useVehicleConfig";


export default CarInfoItem = ({item, isVisible, onHandleAccept, onHandleFav, index, vehicleInfo, isFav}) => {
    
    const customStyle = require('../../../utils/customStyleSheet');

    const {deleteVehicleConfig} = useVehicleConfig();

    const deleteConfig = (numberPlate) => {
        deleteVehicleConfig(numberPlate);
    }

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
    
    return (
        <Modal isVisible={isVisible}>
            <View style={[customStyle.modalContainer]}>
                <View style={[customStyle.modalContentContainer, {marginTop: 0}]}>
                    <CustomButton
                        onPress={onHandleFav}
                        imageSrc={isFav ? require('../../../../assets/images/icons/bookmark_toggled.png') : require('../../../../assets/images/icons/bookmark.png')}
                        imageStyle={{width: 30, height: 40}}
                        customStyles={{backgroundColor: 'transparent', width: 30, height: 40, alignSelf: 'flex-end'}}
                    />
                    <View style={customStyle.coolBlockTitleContainer}>
                    <Text style={[customStyle.title]}>{vehicleInfo?.brand} {vehicleInfo?.model}</Text>
                    <Text style={[customStyle.subtitle, {color: 'gray', fontStyle: 'italic', fontWeight: 'bold'}]}>"{vehicleInfo?.nickname}"</Text>
                    </View>
                    <View style={customStyle.coolBlockImageContainerWide}>
                        <Image
                        source={
                            vehicleImages[vehicleInfo?.vehicleType]
                        }
                        style={[customStyle.coolBlockImage, {tintColor: vehicleInfo?.color, width: '50%', height: '50%'}]}
                        />
                    </View>
                    <View style={[{width: '10%'}, {justifyContent: 'center'}]}>
                        <Image
                            source={require('../../../../assets/images/matricula.png')}
                            styles = {styles.matricula}
                        />
                    </View>
                    
                    <Text>
                        {vehicleInfo?.numberPlate}
                    </Text>
                    <CustomButton
                        onPress={() => onHandleAccept()}
                        text={i18n.t('miscelaneus.back')}
                        customStyles={{marginBottom: 20, marginTop: 20}}
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
    matricula: {
        width: 250,
        height: 100,
        alignSelf: 'center',
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