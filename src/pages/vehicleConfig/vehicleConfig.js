import { View, Text, ActivityIndicator, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
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
import carTypeImages from '../../utils/carTypeImages';


function VehicleConfig({ navigation }) {    

    const { sendConfig } = useVehicleConfig();

    const { getVehicleBrands, getVehicleModels} = useVehicle();

    const[vehicleTypes, setVehicleTypes] = useState(); 

    const {GetCarImage} = carTypeImages();

    const customStyle = require('../../utils/customStyleSheet');

    const { auth, setAuth, updateUser } = useAuth();

    const initialState = {
        vehicleBrand: '',
        vehicleModel: '',
        vehicleNickname: '',
        vehicleType: 0,
        vehicleColor: 'white',
        numberPlate: '',
    };

    const [vehicle, setVehicle] = useState(initialState);
    const [modalOpen, setModalOpen] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const [vehicleBrands, setVehicleBrands] = useState();
    const [vehicleModels, setVehicleModels] = useState();

    const [isLoading, setIsLoading] = useState(false);

    useEffect (async () => {
        if (selectedBrand !== '') {
            setIsLoading(true);
            let temp = await getVehicleModels(selectedBrand);
            setIsLoading(false);
            let models =  [...new Set(temp?.map(item => item.model))];
            models?.sort();
            setVehicleModels(models);
            setSelectedModel("");
            setVehicle({...vehicle, ['vehicleBrand']: selectedBrand});
        }
        
    }, [selectedBrand]);

    useEffect (async () => {
        setVehicle({...vehicle, ['vehicleModel']: selectedModel});
        
    }, [selectedModel]);
    
    const onAcceptVehicle = (color) => {
        setCurrentColor(color)
        setModalOpen(false)
        let temp = vehicleTypes
        let tempObj = {
            imageSrc: GetCarImage(currentVehicleType, color),
            imageStyle: {height:'90%', aspectRatio: 1, alignSelf: "center"},
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
    
    useEffect(async ()=>{
        setIsLoading(true);
        let brands = await getVehicleBrands();
        setIsLoading(false);
        if(brands) {
            brands?.sort();
            setVehicleBrands(brands);
            
        }  
        setVehicle(initialState);
        let temp = [];
        for(let i = 0; i < 9; i++){
            let tempObj = {
              imageSrc: GetCarImage(i, 'white'),
              imageStyle: {height:'90%', aspectRatio: 1, alignSelf: "center"},
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
                message: i18n.t('signIn.emptyFieldMessage')
            });
        }else {
            sendConfig(vehicle)
                .then(user => {                                        
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
                        currentSelected={selectedBrand}
                    />
                </View>
                <View style={customStyle.formInputContainer}>
                <Text style={[customStyle.formInputTitle]}> {i18n.t('vehicleConfig.vehicleModel')}</Text>
                    <CustomDropDown
                        options={vehicleModels}
                        changeSelected={setSelectedModel}
                        currentSelected={selectedModel}
                    />
                </View>
                <View style={customStyle.formInputContainer}>
                {error.error && error.attribute === "NumberPlate" ?
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>
                        {i18n.t('vehicleConfig.errorNumberPlate')}
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
                    customStyles={styles.button}
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
                        <CustomButton
                            text={i18n.t('vehicleConfig.cancel')}
                            onPress={() => cancel()}
                            customStyles={styles.nextButton}
                        />
                        }
                        {/* <Text style={{color: 'blue'}} onPress={() => cancel()}>
                            {i18n.t('vehicleConfig.cancel')}
                        </Text> */}
                    </View>
                </View>
            </ScrollView>
            {
            isLoading ?
            <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#b28dfc"/>
            </View>
            : null
            }
            {<CarSelectorModal
                vehicleType={currentVehicleType}
                vehicleBrand={vehicleBrand}
                isVisible={modalOpen}
                onHandleCancel={() => setModalOpen(false)}
                onHandleAccept={onAcceptVehicle}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    spinner:{
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5000,
        color: 'red',
      },
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
        marginBottom: 30,
        backgroundColor: '#f2f2f2',
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
        alignSelf: 'center',
        backgroundColor: '#c5a9fc',
        borderColor: '#b491fa',
        borderWidth: 3
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
        textAlign: 'center',
    },
    errorContainer: {
        marginBottom: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor:'#ff00001c',
        padding: 5,
    },
    nextButton: {
        backgroundColor: '#c5a9fc',
        marginLeft: 10,
        height: 30,
        borderColor: '#b491fa',
        borderWidth: 3
    }
})

export {VehicleConfig}