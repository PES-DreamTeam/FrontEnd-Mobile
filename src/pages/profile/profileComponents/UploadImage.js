import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import i18n from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';


export default function UploadImage() {

    useEffect( async() => {
        await ImagePicker.getMediaLibraryPermissionsAsync();
    }, []);

    const [image, setImage] = useState(null);
    const addImage= async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.cancelled) {
        setImage(result.uri);
    }
    };

    return (
    <View style={styles.container}>
        {
            image  &&<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        }
        <View style={styles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
            <Text style={styles.imageText}>{image ? `${i18n.t('uploadImage.editImage')}` : `${i18n.t('uploadImage.uploadImage')}`}</Text>
            <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
        </View>
    </View>

    );
}

const styles=StyleSheet.create({
    profileImage: {
    width: 125, 
    height: 125, 
    borderRadius: 125/ 2,
    alignSelf: 'center',
    }, 
    container:{
        elevation: 2,
        height: 150,
        width: 150,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 150/2,
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