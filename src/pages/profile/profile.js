import React, { useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, useWindowDimensions, ScrollView } from 'react-native';
import i18n from 'i18n-js';
import useAuth from '../../hooks/useAuth';
import useUserSettings from '../../hooks/useUserSettings';
import CarInfoItem from './profileComponents/CarInfoItem';
import Carousel from 'react-native-snap-carousel';
import UploadImage from './profileComponents/UploadImage';

function ProfileScreen({ navigation }) {

    const {auth} = useAuth();
    useUserSettings(); 

    const [user,setUser] = useState({
        id:auth.user._id,
        email:auth.user.email,
        nickname:auth.user.nickname,
        vehicleConfig: auth.user.vehicleConfig 
    })
    useEffect(()=>{setUser({
        id:auth.user._id,
        email:auth.user.email,
        nickname:auth.user.nickname,
        vehicleConfig: auth.user.vehicleConfig 
    })},[auth])

    const {width} = useWindowDimensions();

    const{id,email,nickname, vehicleConfig} = user;

    return(
        <View style={styles.container}>
            <ScrollView>
            {/* Imagen de perfil */}
            <View style={styles.uploadImage} >
                <UploadImage/>

            </View>
            {/* Nombre de perfil */}
            <Text style = {[styles.title]}>
                {nickname}
               
            </Text>
            <Text style = {[styles.subtitle]}>
                {email}
            </Text>
            <Text style = {[styles.header]}>
                {i18n.t('profile.yourVehicle')}
            </Text>

            {vehicleConfig.length > 0 ? (
                <View>
                    <Carousel
                        data = {vehicleConfig}
                        renderItem = {({item}) => <CarInfoItem item = {item} />}
                        sliderWidth={320}
                        sliderHeight={128}
                        itemWidth={320}
                        itemHeight={128}
                        keyExtractor={(item,index) => index}
                    />
                </View> 
            ) : <Text>  {i18n.t('profile.vehicleNotDef')} </Text>}
            <View style={styles.buttonBar}>
                <Pressable style={styles.editButton} onPress={()=>("")}>
                    <Text style={{color:"white", fontWeight: 'bold'}}>
                        {i18n.t('profile.editProfile')}
                    </Text>
                </Pressable>
                <Pressable style={styles.addButton} onPress={() => {navigation.navigate("VehicleConfig")}}>
                    <Text style={{color:"white", fontWeight: 'bold'}}>
                        {i18n.t('profile.addNewVehicle')}
                    </Text>
                </Pressable>
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
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 25,
        alignSelf: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
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