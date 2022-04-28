import React from "react";
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import i18n from 'i18n-js';
import CustomButton from '../../../utils/button'
import useVehicleConfig from "../../../hooks/useVehicleConfig";


export default CarInfoItem = ({item, index, currentVehicle}) => {
    const {width} = useWindowDimensions();

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
    ]

    if(item.vehicleType === undefined){
        item.vehicleType = 0;
    }
    
    return (
        <View style ={[styles.container]}>
            <Image source = {vehicleImages[item.vehicleType]} style={[styles.image, {tintColor: item.color}, {width, resizeMode: 'contain'}, ]} />
            <View style = {[styles.infoContainer]}>
                <View style={[styles.textContainer]}>
                    {index == currentVehicle ? <Text style= {[styles.title]}>{i18n.t("carInfoItem.default")} </Text> : <></>}
                    <Text style= {[styles.title]}>{item.brand} {item.model}</Text>
                    <Text style= {[styles.text]}> {i18n.t('carInfoItem.nickname')} "{item.nickname}"</Text>
                    <Text style= {[styles.text]}> {i18n.t('carInfoItem.numberPlate')} {item.numberPlate}</Text>
                </View>
                <View style={[styles.buttonContainer]}>    
                    <CustomButton
                        customStyles={styles.deleteButton}
                        imageSrc={require('../../../../assets/images/icons/delete.png')}
                        imageHeight={35}
                        imageWidth={35}
                        onPress={() => {deleteConfig(item.numberPlate)}}
                    />
                </View>
                
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 3,
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