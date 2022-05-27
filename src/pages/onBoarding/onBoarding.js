import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import i18n from 'i18n-js';
import CustomButton from "../../utils/button";
import Onboarding from 'react-native-onboarding-swiper';


const Skip = ({ ...props }) => (
    <CustomButton
        text = {i18n.t('onboarding.skip')}
        customStyles = {[{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '20%'}]}
        { ...props }
    />
);

const Next = ({ ...props }) => (
    <CustomButton
        text = {i18n.t('onboarding.next')}
        customStyles = {[{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '20%'}]}
        { ...props }
    />
);

const Done = ({ ...props }) => (
    <CustomButton
        text = {i18n.t('onboarding.done')}
        customStyles = {[{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '20%'}]}
        { ...props }
    />
);
    


const OnBoarding = ({ navigation }) => {  
    return (
        <View style={[{height: '100%', width: '100%'}]}>
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                pages={[
                    {
                      backgroundColor: '#a6e4d0',
                      image: <Image style={styles.image} source={require('../../../assets/images/onboarding1.png')} />,
                      title: i18n.t('onboarding.title1'),
                      subtitle: i18n.t('onboarding.subtitle1'),
                    },
                    {
                      backgroundColor: '#fdeb93',
                      image: <Image style={styles.image} source={require('../../../assets/images/onboarding2.png')} />,
                      title: i18n.t('onboarding.title2'),
                      subtitle: i18n.t('onboarding.subtitle2'),
                    },
                    {
                      backgroundColor: '#e9bcbe',
                      image: <Image style={styles.image} source={require('../../../assets/images/onboarding3.png')} />,
                      title: i18n.t('onboarding.title3'),
                      subtitle: i18n.t('onboarding.subtitle3'),
                    },
                    {
                        backgroundColor: '#fdeb93',
                        image: <Image style={styles.image} source={require('../../../assets/images/onboarding4.png')} />,
                        title: i18n.t('onboarding.title4'),
                        subtitle: i18n.t('onboarding.subtitle4'),
                    },
                    {
                    backgroundColor: '#a6e4d0',
                    image: <Image style={styles.image} source={require('../../../assets/images/onboarding5.png')} />,
                    title: i18n.t('onboarding.title5'),
                    subtitle: i18n.t('onboarding.subtitle5'),
                    },
                ]}
                onSkip={() => navigation.navigate("Home")}
                onDone={() => navigation.navigate("Home")}
            />
        </View>
    );
}

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
    },
    image: {
        top: 0,
        width: '80%',
        height: undefined,
        aspectRatio: 1,
    }
})

export {OnBoarding}