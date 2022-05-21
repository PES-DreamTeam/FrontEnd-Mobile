import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import i18n from 'i18n-js';
import CustomButton from '../../../utils/button';

function SignUpScreen({ navigation }) {

    const customStyle = require('../../../utils/customStyleSheet');

    const { signUp } = useAuth();
    const [error, setError] = useState({error: false, errors:[]});
    const [showPassword, setShowPassword] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user;

    const onChangeText = (text, name) => {
        setError({error: false, errors:[]});
        setUser({
            ...user,
            [name]: text 
        })
    }

    const createUser = async () => {
        if(name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            alert('Please fill all fields');
            return;
        }
        else 
            signUp(user)
                .catch(error => {
                    setError(error)
                });
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/images/logo.png')}
                    style={[styles.logo]}
                />
            </View> */}
            <View style={[customStyle.coolBlockContainer, {width: '100%', marginTop: 0}]}>
                <View style={[customStyle.coolBlockTitleContainer]}>
                    <Text style={customStyle.bigTitle}>
                        {i18n.t('signUp.title')}
                    </Text>
                    <Text style={customStyle.subtitle}>
                        {i18n.t('signUp.form.enterCredentials')}
                    </Text>
                </View>
                <View style={[{width: '90%', alignSelf: 'center'}]}>
                    <View style={customStyle.formInputContainer}>
                        <Text style={[customStyle.formInputTitle]}> {i18n.t('signUp.enterName')}</Text>
                        
                        <TextInput
                            onChangeText={(e) => onChangeText(e, 'name')}
                            value={name}
                            style={[customStyle.formInputText, {textAlignVertical: 'center'}]}
                            placeholder={i18n.t('signUp.form.name')}
                        />
                    </View>
                    <View style={customStyle.formInputContainer}>
                        <Text style={[customStyle.formInputTitle]}> {i18n.t('signUp.enterEmail')}</Text>
                        {
                            error?.errors?.map(error => error.attribute === "email" ?  
                                <View style={styles.errorContainer} key={error.attribute}>
                                    <Text style={styles.error}>
                                            <Text>{error.errorMessage}</Text>
                                    </Text>
                                </View>
                            :null) 
                        }
                        <TextInput
                            onChangeText={(e) => onChangeText(e, 'email')}
                            value={email}
                            style={[customStyle.formInputText, {textAlignVertical: 'center'}]}
                            name="email"
                            placeholder={i18n.t('signUp.form.email')}
                        />
                    </View>
                    <View style={customStyle.formInputContainer}>
                        <Text style={[customStyle.formInputTitle]}> {i18n.t('signUp.enterPassword')}</Text>
                        {
                            error?.errors?.map(error => error.attribute === "password" ?  
                                <View style={styles.errorContainer} key={error.attribute}>
                                    <Text style={styles.error}>
                                            <Text>{error.errorMessage}</Text>
                                    </Text>
                                </View>
                            :null) 
                        }
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
                    onPress={createUser}
                    text={i18n.t('signUp.title')}
                    customStyles={[customStyle.button, {marginVertical: 20, width: '80%', alignSelf: 'center', backgroundColor: '#c5a9fc', borderColor: '#b491fa', borderWidth: 3}]}
                />
            </View>
            <View style={[customStyle.coolBlockContainer, {width: '100%', marginTop: 0}]}>
                <View style={[customStyle.coolBlockTitleContainerSmall]}>
                    <Text style={customStyle.title}>
                        {i18n.t('signUp.alreadyAccount')}
                    </Text>
                </View>
                <View style={styles.button}>
                    <CustomButton
                        onPress={() => navigation.navigate('SignIn')}
                        text={i18n.t('signUp.goToSignIn')}
                        customStyles={[customStyle.button, {marginVertical: 20, width: '100%', alignSelf: 'center', backgroundColor: '#c5a9fc', borderColor: '#b491fa', borderWidth: 3}]}
                    />
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 20,
    },
    showPwd: {
        width: 40,
        height: 40,
    },
    subtitle: {
        marginBottom: 10,
    },
    logo: {
        width: 225,
        height: 150,
        alignSelf: 'center',
    },
    button: {
        width: '50%',
        alignSelf: 'center',
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

export { SignUpScreen }