import React from "react";
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import i18n from 'i18n-js';
import CustomButton from '../../../utils/button'
import Modal from 'react-native-modal';
import useVehicleConfig from "../../../hooks/useVehicleConfig";
import carTypeImages from '../../../utils/carTypeImages';


export default CarInfoItem = ({item, isVisible, onHandleAccept, onHandleFav, index, vehicleInfo, isFav}) => {
    
    const customStyle = require('../../../utils/customStyleSheet');

    const {deleteVehicleConfig} = useVehicleConfig();
    const {GetCarImage} = carTypeImages();

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
                    <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                        {
                            isFav ?
                            <Text style={[customStyle.subtitle, {textAlignVertical: 'center', color: 'gray', fontStyle: 'italic', fontWeight: 'bold', width: '80%'}]}>{i18n.t('vehicleConfig.defaultVehicle')}</Text>
                            : <Text style={[customStyle.subtitle, {textAlignVertical: 'center', color: 'gray', fontStyle: 'italic', fontWeight: 'bold', width: '80%'}]}></Text>
                        }
                        <CustomButton
                            onPress={onHandleFav}
                            imageSrc={isFav ? require('../../../../assets/images/icons/bookmark_toggled.png') : require('../../../../assets/images/icons/bookmark.png')}
                            imageStyle={{width: 30, height: 40, alignSelf: 'flex-end'}}
                            customStyles={{backgroundColor: 'transparent', width: 30, height: 40, alignSelf: 'flex-end', right: 0}}
                        />
                    </View>
                    <View style={[customStyle.coolBlockContainer, {width: '100%'} ]}>
                        <View style={customStyle.coolBlockTitleContainer}>
                        <Text style={[customStyle.title]}>{vehicleInfo?.brand} {vehicleInfo?.model}</Text>
                        <Text style={[customStyle.subtitle, {color: 'gray', fontStyle: 'italic', fontWeight: 'bold'}]}>"{vehicleInfo?.nickname}"</Text>
                        </View>
                        <View style={styles.matriculaContainer}>
                            <View style={styles.matriculaEU}>
                                <Image
                                    source={require('../../../../assets/images/plateEU.png')}
                                    style={{height: '90%', aspectRatio: 0.5}}
                                />
                            </View>
                            <Text style={styles.matriculaText}>{vehicleInfo?.numberPlate.toUpperCase()}</Text>
                            
                        </View>
                        <View style={[styles.vehicleContainer]}>
                            <Image 
                                source={GetCarImage(vehicleInfo?.vehicleType, vehicleInfo?.color)}
                                style={{width: '90%', aspectRatio: 1}}    
                            />
                        </View>
                    </View>
                    <CustomButton
                        onPress={() => onHandleAccept()}
                        text={i18n.t('miscelaneus.back')}
                        customStyles={{marginBottom: 20, marginTop: 20,backgroundColor: '#c5a9fc', borderColor: '#b491fa', borderWidth: 3}}
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
    vehicleContainer: {
        width: '90%',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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
    matriculaContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '70%',
        height: '10%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
    image: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    matriculaText: {
        height: '99%',
        width: '80%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    matriculaEU: {
        height: '99%',
        width: '15%',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    insideNumberPlate: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        top: '-25%',
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