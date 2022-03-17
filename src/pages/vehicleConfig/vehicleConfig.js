import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import {CarTypeSelector, CircularColorBtnList} from './vehicleConfigComponents';
import i18n from 'i18n-js';

function VehicleConfig() {

    const [vehicle, setVehicle] = useState({
        vehicleBrand: '',
        vehicleModel: '',
        vehicleNickname: '',
        vehicleType: 0,
        vehicleColor: '#000000'
    });

    const carColors = { 
        White:  '#DDDDDD',
        Grey:   '#4E4E4E',
        Black:  '#222222',
        Red:    '#871614', 
        Blue:   '#16345D',
        Yellow: '#FDCC0D',
        Green:  '#296E01'
    };

    const [currentColor, setCurrentColor] = useState('#ffffff');

    const { vehicleBrand, vehicleModel, vehicleNickname, vehicleType, vehicleColor } = vehicle;

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

    useEffect(()=> {console.log(vehicle)}, [vehicle]);

    

    return(
        <View style={styles.container}>
            <View style={[styles.topContainer]}>
                <Text style={styles.title}>{i18n.t('vehicleConfig.title')}</Text>
                <Text style={[styles.formTitle]}>Vehicle brand</Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'vehicleBrand')}
                    value={vehicleBrand}
                    style={styles.input}
                    name="vehicleBrand"
                    placeholder="Car's brand here"
                />
                <Text style={[styles.formTitle]}>Vehicle model</Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'vehicleModel')}
                    value={vehicleModel}
                    style={styles.input}
                    name="vehicleModel"
                    placeholder="Car's model here"
                />
                <Text style={[styles.formTitle]}>Vehicle Color</Text>

                <CircularColorBtnList
                    carColors = {carColors}
                    onChangeColor = {onChangeColor}
                />
                
                <Text style={[styles.formTitle]}>Vehicle Nickname</Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'vehicleNickname')}
                    value={vehicleNickname}
                    style={styles.input}
                    name="vehicleNickname"
                    placeholder="Car's nickname here"
                />
                <CarTypeSelector
                    vehicleColor={vehicleColor}
                    onSnapToItem={updateCurrentCarType}
                />
                <Button
                    title={'Continue'}
                />

                <View style={[styles.skipContainer]}>
                    <Text>
                        Don't have an EV?
                    </Text>
                    <View style={{marginLeft: 5}}>
                        <Text style={{color: 'blue'}} onPress={() => {navigation.navigate("SignUp")}}>
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