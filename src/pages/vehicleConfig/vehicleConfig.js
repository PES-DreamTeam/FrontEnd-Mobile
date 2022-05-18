import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import {CarTypeSelector, CircularColorBtnList} from './vehicleConfigComponents';
import useAuth from '../../hooks/useAuth';
import useVehicleConfig from '../../hooks/useVehicleConfig';
import i18n from 'i18n-js';
import CustomButton from "../../utils/button";
import ButtonTable from "../../utils/buttonTable";
import CarSelectorModal from './vehicleConfigComponents/carSelectorModal';
import useVehicle from '../../hooks/useVehicle';
import CustomDropDown from '../../utils/customDropDown';


function VehicleConfig({ navigation }) {    

    const { sendConfig } = useVehicleConfig();

    const { getVehicleBrands, getVehicleModels} = useVehicle();

    const[vehicleTypes, setVehicleTypes] = useState(); 

    const customStyle = require('../../utils/customStyleSheet');

    const { auth, setAuth, updateUser } = useAuth();

    const initialState = {
        vehicleBrand: '',
        vehicleModel: '',
        vehicleNickname: '',
        vehicleType: 0,
        vehicleColor: '#DDDDDD',
        numberPlate: '',
    };

    const [vehicle, setVehicle] = useState(initialState);
    const [modalOpen, setModalOpen] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const [vehicleBrands, setVehicleBrands] = useState();
    const [vehicleModels, setVehicleModels] = useState();

    useEffect (async () => {
        if (selectedBrand !== '') {
            let temp = await getVehicleModels(selectedBrand);
            let models =  [...new Set(temp.map(item => item.model))];
            console.log("holi");
            console.log(models);
            models?.sort();
            setVehicleModels(models);
            setVehicle({...vehicle, ['vehicleBrand']: selectedBrand});
        }
        
    }, [selectedBrand]);

    useEffect (async () => {
        if (selectedModel !== '') {
            setVehicle({...vehicle, ['vehicleModel']: selectedModel});
        }
        
    }, [selectedModel]);
    
    const onAcceptVehicle = (color) => {
        setCurrentColor(color)
        setModalOpen(false)
        let temp = vehicleTypes
        let tempObj = {
            imageSrc: vehicleImages[currentVehicleType],
            imageStyle: {width: '100%', height:'50%', tintColor: color, alignSelf: "center"},
            onPress: () => {
              setCurrentVehicleType(currentVehicleType);
              setModalOpen(true);
            },
        }
        temp[currentVehicleType] = tempObj;
        setVehicleTypes(temp);
        setVehicle({
            ...vehicle,
            vehicleColor: color ,
            vehicleType: currentVehicleType
        })

    }

    var vehicleImages = [
        require( '../../../assets/images/carTypes/carType_0.png'),
        require( '../../../assets/images/carTypes/carType_1.png'),
        require( '../../../assets/images/carTypes/carType_2.png'),
        require( '../../../assets/images/carTypes/carType_3.png'),
        require( '../../../assets/images/carTypes/carType_4.png'),
        require( '../../../assets/images/carTypes/carType_5.png'),
        require( '../../../assets/images/carTypes/carType_6.png'),
        require( '../../../assets/images/carTypes/carType_7.png'),
        require( '../../../assets/images/carTypes/carType_8.png'),
    ]
    
    useEffect(async ()=>{
        let brands = await getVehicleBrands();
        if(brands) {
            brands?.sort();
            setVehicleBrands(brands);
            
        }  
        setVehicle(initialState);
        let temp = [];
        for(let i = 0; i < vehicleImages.length; i++){
            let tempObj = {
              imageSrc: vehicleImages[i],
              imageStyle: {width: '100%', height:'50%', tintColor: 'black', alignSelf: "center"},
              onPress: () => {
                setCurrentVehicleType(i);
                setModalOpen(true);
              },
            };
            temp.push(tempObj);
        }
        setVehicleTypes(temp);

        
    },[])

    const [error, setError] = useState({
        error: false, 
        attribute: '',
        message: ''
    });

    const [currentColor, setCurrentColor] = useState('#DDDDDD');
    const [currentVehicleType, setCurrentVehicleType] = useState(0);
    

    const { vehicleBrand, vehicleModel, vehicleNickname, vehicleType, vehicleColor, numberPlate } = vehicle;

    const onChangeText = (text, name) => {
        setVehicle({
            ...vehicle,
            [name]: text 
        })
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
                    console.log(user);                                          
                    setAuth({
                        ...auth,
                        user: user
                    });
                    setVehicle(initialState);
                    navigation.navigate("Profile");
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
        clearAllFields();
        updateUser({...auth.user, isNew: false});
    }

    const clearAllFields = () => {
        setVehicle(initialState);
    }

    const cancel = () => {
        clearAllFields();
        navigation.navigate("Profile");
    }

    return(
        <View style={customStyle.formContainer}>
            <ScrollView style={[styles.topContainer]}>
                {error.error && error.attribute !== "NumberPlate" ?
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>
                            {error.message}
                        </Text>
                    </View>
                : null}
                <View style={customStyle.formInputContainer}>
                    <Text style={[customStyle.formInputTitle]}> {i18n.t('vehicleConfig.vehicleBrand')}</Text>
                    <CustomDropDown
                        options={vehicleBrands}
                        changeSelected={setSelectedBrand}
                    />
                </View>
                <View style={customStyle.formInputContainer}>
                <Text style={[customStyle.formInputTitle]}> {i18n.t('vehicleConfig.vehicleModel')}</Text>
                    <CustomDropDown
                        options={vehicleModels}
                        changeSelected={setSelectedModel}
                    />
                </View>
                <View style={customStyle.formInputContainer}>
                {error.error && error.attribute === "NumberPlate" ?
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>
                            {error.message}
                        </Text>
                    </View>
                : null}
                <Text style={[customStyle.formInputTitle]}> {i18n.t('vehicleConfig.vehicleNumPlate')} </Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'numberPlate')}
                    value={numberPlate}
                    style={[customStyle.formInputText, {textAlignVertical: 'center'}]}
                    name="numberPlate"
                    placeholder= {i18n.t('vehicleConfig.vehicleNumPlatePlaceholder')}
                />
                </View>
                <View style={customStyle.formInputContainer}>
                <Text style={[customStyle.formInputTitle]}> {i18n.t('vehicleConfig.vehicleNickname')}</Text>
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'vehicleNickname')}
                    value={vehicleNickname}
                    style={[customStyle.formInputText, {textAlignVertical: 'center'}]}
                    name="vehicleNickname"
                    placeholder= {i18n.t('vehicleConfig.vehicleNicknamePlaceholder')}
                />
                </View>
                <ButtonTable
                    buttonsInfo={vehicleTypes}
                    rowSize={3}
                    currentSelected={vehicle.vehicleType}
                />
                <CustomButton
                    text={ i18n.t('vehicleConfig.continue')}
                    onPress={() => {
                        validateInformation();
                    }}
                />

                <View style={[styles.skipContainer]}>
                    <Text>
                        { i18n.t('vehicleConfig.notEV')}
                    </Text>
                    <View style={{marginLeft: 5}}>
                        {auth?.user?.isNew ? (
                        <Text style={{color: 'blue'}} onPress={() => markAsNotNew()}>
                            {i18n.t('vehicleConfig.skip')}
                        </Text>
                        ) :
                        <Text style={{color: 'blue'}} onPress={() => cancel()}>
                            {i18n.t('vehicleConfig.cancel')}
                        </Text>
                        }
                    </View>
                </View>
            </ScrollView>
            {<CarSelectorModal
                vehicleType={currentVehicleType}
                isVisible={modalOpen}
                onHandleCancel={() => setModalOpen(false)}
                onHandleAccept={onAcceptVehicle}
            />}
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