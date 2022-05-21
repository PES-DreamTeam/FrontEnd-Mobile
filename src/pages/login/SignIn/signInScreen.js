import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import useAuth from '../../../hooks/useAuth';
import i18n from 'i18n-js';
import CustomButton from '../../../utils/button';
import { ScrollView } from 'react-native-gesture-handler';

function SignInScreen({ navigation }) {

    const { signIn, loginWithFacebook } = useAuth();
    const customStyle = require('../../../utils/customStyleSheet');

    const [showPassword, setShowPassword] = useState(true);
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({
        error: false, 
        message: ''
    });
    const [isLoading, setLoading] = useState(false);

    const { email, password } = user;

    const onChangeText = (text, name) => {
        setUser({
            ...user,
            [name]: text 
        })
    }

    const SignIn = () => {
        if(email.length === 0 || password.length === 0) {
            //Form Error
            setError({
                error: true,
                message: i18n.t('signUp.emptyFieldMessage')
            });
        }else {
            setLoading(true);
            signIn(user)
                .then()
                .catch(err => {setError({error:true, message: i18n.t('signUp.pwdOrEmailMessage')});})
                .finally(()=> setLoading(false));
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../../assets/images/logo.png')}
                        style={[styles.logo]}
                    />
                </View>
                <View style={[customStyle.coolBlockContainer, {width: '100%', marginTop: 0}]}>
                    <View style={[customStyle.coolBlockTitleContainer]}>
                        <Text style={customStyle.bigTitle}>
                        {i18n.t('signIn.title')} 
                        </Text>
                        <Text style={customStyle.subtitle}>
                            {i18n.t('signIn.form.enterCredentials')}
                        </Text>
                    </View>
                    <View style={[{width: '90%', alignSelf: 'center'}]}>
                        <View style={customStyle.formInputContainer}>
                            <Text style={[customStyle.formInputTitle]}> {i18n.t('signIn.enterEmail')}</Text>
                            {error.error ?
                                <View style={styles.errorContainer}>
                                    <Text style={styles.error}>
                                        {error.message}
                                    </Text>
                                </View>
                            : null}
                            <TextInput
                                onChangeText={(text) => onChangeText(text, 'email')}
                                value={email}
                                style={[customStyle.formInputText, {textAlignVertical: 'center'}]}
                                name="email"
                                placeholder="Email:"
                            />
                        </View>
                        <View style={[customStyle.formInputContainer, {marginTop: 0}]}>
                            <Text style={[customStyle.formInputTitle]}> {i18n.t('signIn.enterPassword')}</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    onChangeText={(text) => onChangeText(text, 'password')}
                                    value={password}
                                    style={[customStyle.formInputText, {textAlignVertical: 'center', marginBottom: 0, width: '100%'}]}
                                    name="password"
                                    placeholder="Password:"
                                    textContentType="password"
                                    secureTextEntry={showPassword}
                                    />
                                <View style={[]}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={[{right:'120%'}]}
                                        >
                                        <Image
                                            source={require('../../../../assets/images/showPwd.png')}
                                            style={styles.showPwd}
                                            />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <CustomButton
                        onPress={()=> SignIn()}
                        text={isLoading ? i18n.t('miscelaneus.loading') : i18n.t('signIn.title')}
                        disabled={isLoading}
                        customStyles={[customStyle.button, {marginBottom: 10, width: '80%', alignSelf: 'center', backgroundColor: '#c5a9fc', borderColor: '#b491fa', borderWidth: 3}]}
                    />
                </View>
                <View style={[customStyle.coolBlockContainer, {width: '100%', marginTop: 20}]}>
                    <View style={[customStyle.coolBlockTitleContainerSmall]}>
                        <Text style={customStyle.title}>
                            {i18n.t('signIn.otherSocial')}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'space-around', width: '100%'}}>
                        <CustomButton
                            text='Facebook'
                            customStyles={[customStyle.button, {marginVertical: 20, width: '40%', alignSelf: 'center', backgroundColor: '#c5a9fc', borderColor: '#b491fa', borderWidth: 3}]}
                            onPress={loginWithFacebook}

                        />

                        <CustomButton
                            text='Google'
                            customStyles={[customStyle.button, {marginVertical: 20, width: '40%', alignSelf: 'center', backgroundColor: '#c5a9fc', borderColor: '#b491fa', borderWidth: 3}]}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                    <Text style={{marginTop: 30}}>
                        {i18n.t('signIn.noAccount')}
                    </Text>
                    <View style={{marginLeft: 15}}>
                        <CustomButton
                            text={i18n.t('signUp.title')}
                            customStyles={[customStyle.button, {marginVertical: 20, width: '120%', height: '20%', alignSelf: 'center', backgroundColor: '#c5a9fc', borderColor: '#b491fa', borderWidth: 3}]}
                            onPress={() => {navigation.navigate("SignUp")}}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    topContainer: {
        width: "100%"
    },
    showPwd: {
        width: 40,
        height: 40,
    },
    logoContainer: {
        
    },
    logo: {
        width: 225,
        height: 150,
        alignSelf: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    subtitle: {
        marginBottom: 10,
    },
    button: {
        width: 150,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
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



export { SignInScreen }