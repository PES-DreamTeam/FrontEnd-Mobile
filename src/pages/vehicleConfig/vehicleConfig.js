import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import {CarTypeSelector, CircularColorBtnList} from './vehicleConfigComponents';
import useAuth from '../../hooks/useAuth';
import useVehicleConfig from '../../hooks/useVehicleConfig';
import i18n from 'i18n-js';

function VehicleConfig({ navigation }) {    

    const { sendConfig } = useVehicleConfig();
    
    const carColors = { 
        White:  '#DDDDDD',
        Grey:   '#4E4E4E',
        Black:  '#222222',
        Red:    '#871614', 
        Blue:   '#16345D',
        Yellow: '#FDCC0D',
        Green:  '#296E01'
    };

    const { auth, setAuth, updateUser } = useAuth();

    const [vehicle, setVehicle] = useState({
        vehicleBrand: '',
        vehicleModel: '',
        vehicleNickname: '',
        vehicleType: 0,
        vehicleColor: carColors.White,
        numberPlate: '',
    });

    const [error, setError] = useState({
        error: false, 
        attribute: '',
        message: ''
    });

    const [currentColor, setCurrentColor] = useState(carColors.White);

    const { vehicleBrand, vehicleModel, vehicleNickname, vehicleType, vehicleColor, numberPlate } = vehicle;

    const onChangeText = (text, name) => {
        setVehicle({
            ...vehicle,
            [name]: text 
        })
    }

    const onChangeColor = (color) => {
        setVehicle({...vehicle, ['vehicleColor']: color});
    }

    const updateCurrentCarType = (index) => {
        setVehicle({...vehicle, ['vehicleType']: index});

    }


    const validateInformation = () => {

        if(vehicleBrand.trim().length === 0 || vehicleModel.trim().length === 0 ||
            vehicleNickname.trim().length === 0 || numberPlate.trim().length === 0) {
            setError({
                error: true,
                attribute: 'BlankFields',
                message: 'Please fill in all fields'
            });
        }else {
            sendConfig(vehicle)
                .then(user => {
                    setAuth({...auth, user});
                    navigation.navigate("Home");
                })
                .catch(err => {
                    setError({
                        error: true,
                        attribute: err.attribute,
                        message: err.error
                    });
                })
        }
    };

    const markAsNotNew = () => {
        updateUser({...auth.user, isNew: false});
    }

    return(
        <View style={styles.container}>
            <View style={[styles.topContainer]}>
                <Text style={styles.title}>{i18n.t('vehicleConfig.title')}</Text>
                {error.error && error.attribute !== "NumberPlate" ?
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>
                            {error.message}
                        </Text>
                    </View>
                : null}
                <Text style={[styles.formTitle]}> {i18n.t('vehicleConfig.vehicleBrand')}</Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'vehicleBrand')}
                    value={vehicleBrand}
                    style={styles.input}
                    name= "vehicleBrand"
                    placeholder= {i18n.t('vehicleConfig.vehicleBrandPlaceholder')}
                />
                <Text style={[styles.formTitle]}> {i18n.t('vehicleConfig.vehicleModel')}</Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'vehicleModel')}
                    value={vehicleModel}
                    style={styles.input}
                    name="vehicleModel"
                    placeholder= {i18n.t('vehicleConfig.vehicleModelPlaceholder')}
                />
                {error.error && error.attribute === "NumberPlate" ?
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>
                            {error.message}
                        </Text>
                    </View>
                : null}
                <Text style={[styles.formTitle]}> {i18n.t('vehicleConfig.vehicleNumPlate')} </Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'numberPlate')}
                    value={numberPlate}
                    style={styles.input}
                    name="numberPlate"
                    placeholder= {i18n.t('vehicleConfig.vehicleNumPlatePlaceholder')}
                />
                <Text style={[styles.formTitle]}> {i18n.t('vehicleConfig.vehicleColor')}</Text>

                <CircularColorBtnList
                    carColors = {carColors}
                    onChangeColor = {onChangeColor}
                />
                
                <Text style={[styles.formTitle]}> {i18n.t('vehicleConfig.vehicleNickname')}</Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'vehicleNickname')}
                    value={vehicleNickname}
                    style={styles.input}
                    name="vehicleNickname"
                    placeholder= {i18n.t('vehicleConfig.vehicleNicknamePlaceholder')}
                />
                <CarTypeSelector
                    vehicleColor={vehicleColor}
                    onSnapToItem={updateCurrentCarType}
                />
                <Button
                    title={ i18n.t('vehicleConfig.continue')}
                    onPress={() => {
                        validateInformation();
                    }}
                />

                <View style={[styles.skipContainer]}>
                    <Text>
                        { i18n.t('vehicleConfig.notEV')}
                    </Text>
                    <View style={{marginLeft: 5}}>
                        <Text style={{color: 'blue'}} onPress={() => markAsNotNew()}>
                            Skip
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

/*COLORES:
VERDE:  #5CB362
AZUL:   #1D69A6
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    skip: {
        fontSize: 12,
        color: '#929292',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    skipContainer: {
        flexDirection: 'row',  
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 25,
    },
    formTitle: {
        marginBottom: 10,
        color: '#5CB362',
    },
    button: {
        width: '50%',
        alignSelf: 'center',
    },
    input: {
        height: 40, 
        marginBottom: 15,
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    error: {
        color: 'red',
    },
    errorContainer: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor:'#ff00001c',
        padding: 5,
    }
})

export {VehicleConfig}