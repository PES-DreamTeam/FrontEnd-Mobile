import React, { useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, useWindowDimensions } from 'react-native';
import i18n from 'i18n-js';
import useUser from  '../../hooks/useUser';
import CarInfoItem from './profileComponents/CarInfoItem';
import Carousel from 'react-native-snap-carousel';


function ProfileScreen() {

    const{ getUserInfo } = useUser();
        
    const [user,setUser] = useState({
        id:null,
        email:null,
        nickname:null,
        vehicleConfig: [{
            brand:null,
            model:null,
            nickname: null,
            numberPlate: null,
            color: null

        }]
    })

    const {width} = useWindowDimensions();

    const{id,email,nickname, vehicleConfig} = user;
    useEffect(() => {
        (async () => { 
            let infoUsuario = await getUserInfo();
            setUser(
                    infoUsuario
            )
            })();
    },[]);
       
    
    
    return(
        <View style={styles.container}>
            {/* Imagen de perfil */}
            <Image 
                source={require('../../../assets/images/awakt.jpg')} 
                style={[styles.profileImage]}
            />
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
            ) : <Text>Vehicle not defined yet </Text>}
            <Pressable style={styles.editButton} onPress={()=>("")}>
                <Text style={{color:"white", fontWeight: 'bold'}}>
                    Edit your profile
                </Text>
            </Pressable>


        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
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
        marginTop: 10,
    },
    editButton: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#1D69A6',
        margin: 25,
        padding: 20,
        alignSelf: 'center',
        borderRadius: 100/5,
    },
})

export { ProfileScreen }