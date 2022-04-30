import React, { useEffect, useState, useRef} from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, FlatList, useWindowDimensions, ScrollView } from 'react-native';
import i18n from 'i18n-js';
import useAuth from '../../hooks/useAuth';
import useUserSettings from '../../hooks/useUserSettings';
import CarInfoItem from './profileComponents/CarInfoItem';
import Carousel from 'react-native-snap-carousel';
import UploadImage from './profileComponents/UploadImage';
import CustomButton from '../../utils/button'
import { useToast } from 'react-native-toast-notifications';

function TextEditableLabel({editable, textValue, labelName, normalStyle, editableStyle, ChangeText, localizationKey}) {
    if(editable) {
        return (
            <TextInput
                onChangeText={(text) => ChangeText(text, labelName)}
                value={textValue}
                style={[editableStyle]}
                name= {labelName}
                placeholder= {i18n.t(localizationKey)}
            />
        );
    }
    else {
        return (
            <Text style = {[normalStyle]}>
                {textValue}
            </Text>
        );
    }
}

function ProfileScreen({ navigation }) {

    const {auth, updateUser} = useAuth();
    const toast = useToast();
    useUserSettings(); 

    const [user,setUser] = useState({
        id:auth.user._id,
        email:auth.user.email,
        name:auth.user.nickname,
        vehicleConfig: auth.user.vehicleConfig,
        currentVehicle: auth.user.currentVehicle ?? 0
    })
    useEffect(()=>{setUser({
        id:auth.user._id,
        email:auth.user.email,
        name:auth.user.nickname,
        vehicleConfig: auth.user.vehicleConfig,
        currentVehicle: auth.user.currentVehicle ?? 0
    }); (auth.user)},[auth])

    const {width} = useWindowDimensions();

    const{id,email,name, vehicleConfig} = user;

    const [editProfile,setEditProfile] = useState(false);

    function EnableEditProfile(enabled) {
        if(!enabled) {
            console.log("letsgo");
            updateUser({...auth.user, nickname: user.name, email: user.email, currentVehicle:user.currentVehicle});
            toast.show("", {
                title: i18n.t("reportToast.title"),
                message: i18n.t("reportToast.message"),
                type: "custom_type",
                location: "report",
              });
        }
        //console.log(name);
        setEditProfile(enabled);
    }

    const onChangeText = (text, name) => {
        setUser({
            ...user,
            [name]: text 
        })
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            {/* Imagen de perfil */}
                <View style={styles.uploadImage} >
                    <UploadImage/>

                </View>
                {/* Nombre de perfil */}
                <TextEditableLabel
                    editable={editProfile}
                    ChangeText={(text) => onChangeText(text, 'name')}
                    textValue={name}
                    normalStyle={styles.name}
                    editableStyle={styles.editableName}
                />
                <TextEditableLabel
                    editable={editProfile}
                    ChangeText={(text) => onChangeText(text, 'email')}
                    textValue={email}
                    normalStyle = {[styles.subtitle]}
                    editableStyle={[styles.editableSubtitle]}
                />
                <View style ={styles.informationContainer}>
                { editProfile 
                    ?<Text style = {[styles.header]}>{"Desliza para escoger tu vehículo por defecto"}</Text>
                    :<Text style = {[styles.header]}>{i18n.t('profile.yourVehicle')}</Text>
                }
                </View>       
                {vehicleConfig.length > 0 ? (
                    <View>
                        <Carousel
                            data = {vehicleConfig}
                            renderItem = {({item, index}) => <CarInfoItem item = {item} index={index} currentVehicle={user.currentVehicle} />}
                            sliderWidth={320}
                            sliderHeight={128}
                            itemWidth={320}
                            itemHeight={128}
                            firstItem={user.currentVehicle}
                            keyExtractor={(item,index) => index}
                            onSnapToItem={(item) =>editProfile ? setUser({...user, ["currentVehicle"]:item}) : ""}
                        />
                        
                    </View> 
                    
                ) : <Text>  {i18n.t('profile.vehicleNotDef')} </Text>}
                <View style={styles.buttonBar}>
                    <CustomButton
                        customStyles={styles.editButton}
                        onPress={()=>EnableEditProfile(!editProfile)}
                        text={editProfile? i18n.t('profile.saveChanges'): i18n.t('profile.editProfile')}
                    />
                    <CustomButton
                        customStyles={styles.addButton}
                        onPress={() => {navigation.navigate("VehicleConfig")}}
                        text={ i18n.t('profile.addNewVehicle')}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        width: "100%"
    },
    uploadImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    informationContainer: {
        flexDirection: 'row',  
        marginTop: 15,
    },
    languageButtons: {
        margin:20,
        width: '50%',
        alignSelf: 'center',
    },
    button: {
        margin: 10,
    },
    profileImage: {
        width: 125, 
        height: 125, 
        borderRadius: 125/ 2,
        alignSelf: 'center',
    }, 
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    editableName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 25,
        alignSelf: 'center',
    },
    editableSubtitle: {
        fontSize: 18,
        marginBottom: 25,
        borderWidth: 1,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginLeft: 10,
        
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    secondaryText: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 5,
    },
    image: {
        tintColor: '#16345D',
        alignSelf: 'center',
    },
    imageC:{
        marginLeft: 50,
    },
    editButton: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#1D69A6',
        borderRadius: 100/5,
        width: "45%",
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    addButton: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#5CB362',
        borderRadius: 100/5,
        width: "45%",
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBar: {
        marginTop: '5%',
        width: '100%',
        textAlign: 'left',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


})

export { ProfileScreen }