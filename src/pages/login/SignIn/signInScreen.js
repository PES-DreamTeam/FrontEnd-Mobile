import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import useAuth from '../../../hooks/useAuth';
import i18n from 'i18n-js';
import Button from '../../../utils/button';

function SignInScreen({ navigation }) {

    const { signIn, loginWithFacebook } = useAuth();

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
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/images/logo.png')}
                    style={[styles.logo]}
                />
            </View>
            <View style={[styles.topContainer]}>
                <View>
                    <Text style={styles.title}>
                       {i18n.t('signIn.title')} 
                    </Text>
                    <Text style={styles.subtitle}>
                        {i18n.t('signIn.form.enterCredentials')}
                    </Text>
                </View>
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
                    style={styles.input}
                    name="email"
                    placeholder="Email:"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        onChangeText={(text) => onChangeText(text, 'password')}
                        value={password}
                        style={[styles.input, {marginBottom: 0, width: '90%'}]}
                        name="password"
                        placeholder="Password:"
                        textContentType="password"
                        secureTextEntry={showPassword}
                    />
                    <View style={[]}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Image
                                source={require('../../../../assets/images/showPwd.png')}
                                style={styles.showPwd}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <Button
                    onPress={()=> SignIn()}
                    text={isLoading ? i18n.t('miscelaneus.loading') : i18n.t('signIn.title')}
                    disabled={isLoading}
                />

            </View>
            <Text>
                {i18n.t('signIn.otherSocial')}
            </Text>
            <View style={{flexDirection:'row', justifyContent: 'space-around', width: '100%'}}>
                <Button
                    text='Facebook'
                    customStyles={styles.button}
                    onPress={loginWithFacebook}
                />

                <Button
                    text='Google'
                    customStyles={styles.button}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text>
                    {i18n.t('signIn.noAccount')}
                </Text>
                <View style={{marginLeft: 5}}>
                    <Text style={{color: 'blue'}} onPress={() => {navigation.navigate("SignUp")}}>
                        {i18n.t('signUp.title')}
                    </Text>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    topContainer: {
        width: "100%"
    },
    showPwd: {
        width: 40,
        height: 40,
    },
    logoContainer: {
        marginBottom: 20,
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