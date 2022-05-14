import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import i18n from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';

export default function UploadImage({editable}) {


    const { auth, updateUser } = useAuth();
    
    const { updateProfilePicture } = useUser();

    useEffect( async() => {
        await ImagePicker.getMediaLibraryPermissionsAsync();
    }, []);

    const [image, setImage] = useState(auth.user.profilePicture);

    useEffect(()=>{
        setImage(auth.user.profilePicture);
    },[auth]);
    const addImage= async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
    });
    if (!result.cancelled) {
        let temp = await updateProfilePicture(result.base64);
        let userTemp = auth.user;
        userTemp.profilePicture = temp;
        updateUser(userTemp, false);
    }
    };

    return (
    <View style={styles.container}>
        {
            image && <Image source={{ uri: image }} style={styles.profileImage} />
        }
        {editable ? (
        <View style={styles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
            <Text style={styles.imageText}>{image ? `${i18n.t('uploadImage.editImage')}` : `${i18n.t('uploadImage.uploadImage')}`}</Text>
            <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
        </View>
        ) : null
        }
    </View>

    );
}

const styles=StyleSheet.create({
    profileImage: {
        width: "100%",
        height: "100%", 
        alignSelf: 'center',
    }, 
    container:{
        elevation: 2,
        height: "100%",
        width: "100%",
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 100,
        overflow: 'hidden',
    },
    uploadBtnContainer:{
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 3,
    }
})