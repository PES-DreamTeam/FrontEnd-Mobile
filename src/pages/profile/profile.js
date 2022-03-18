import React, { useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native'
import useAuth from '../../hooks/useAuth';
import useUserSettings from '../../hooks/useUserSettings';
import i18n from 'i18n-js';
import useUser from  '../../hooks/useUser';
function ProfileScreen() {

    const{ getUserInfo } = useUser();

        
    const [user,setUser] = useState({
        id:null,
        email:null,
        nickname:null
    })

    const{id,email,nickname} = user;

 useEffect(() => {
    (async () => { 
        let infoUsuario = await getUserInfo();
          setUser({
            id:infoUsuario._id,
            email:infoUsuario.email,
            nickname:infoUsuario.nickname
          })
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
            <View style={[styles.informationContainer]}>
                <Text style = {[styles.text]}>
                    Model:
                </Text>
                <Text style = {[styles.secondaryText]}>
                    Mercedes EQS
                </Text>
            </View>
            <View style={[styles.informationContainer]}>
                <Text style = {[styles.text]}>
                    Nickname:
                </Text>
                <Text style = {[styles.secondaryText]}>
                    El EcoCoche
                </Text>
            </View>
            <View style={[styles.informationContainer]}>
                <Text style = {[styles.text]}>
                    NumberPlate:
                </Text>
                <Text style = {[styles.secondaryText]}>
                    ECO12345
                </Text>
            </View>
            <Image 
                source={require('../../../assets/images/carTypes/carType_2.png')} 
                style={[styles.image]}
            />
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
        fontSize: 20,
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