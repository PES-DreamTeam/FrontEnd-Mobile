import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import i18n from 'i18n-js';

function SignUpScreen({ navigation }) {

    const { signUp } = useAuth();

    const [showPassword, setShowPassword] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user;

    const onChangeText = (text, name) => {
        setUser({
            ...user,
            [name]: text 
        })
    }

    const createUser = async () => {
        if(name.length === 0 || email.length === 0 || password.length === 0) {
            alert('Please fill all fields');
            return;
        }
        else 
            signUp(user);
    }

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.subtitle}>
                        {i18n.t('signUp.form.enterCredentials')}
                    </Text>
                </View>
                <TextInput
                    onChangeText={(e) => onChangeText(e, 'name')}
                    value={name}
                    style={styles.input}
                    placeholder={i18n.t('signUp.form.name')}
                />
                <TextInput
                    onChangeText={(e) => onChangeText(e, 'email')}
                    value={email}
                    style={styles.input}
                    name="email"
                    placeholder={i18n.t('signUp.form.email')}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        onChangeText={(e) => onChangeText(e, 'password')}
                        value={password}
                        style={[styles.input, {marginBottom: 0, width: '90%'}]}
                        name="password"
                        placeholder={i18n.t('signUp.form.password')}
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
                    onPress={() => createUser()}
                    title={i18n.t('signUp.title')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    onPress={() => navigation.navigate('SignIn')}
                    title={i18n.t('signUp.goToSignIn')}
                />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 20,
    },
    showPwd: {
        width: 40,
        height: 40,
    },
    subtitle: {
        marginBottom: 10,
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
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
    }
})

export { SignUpScreen }