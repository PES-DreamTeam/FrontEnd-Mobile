import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SignInScreen, SignUpScreen } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from 'i18n-js';

const Stack =  createStackNavigator();

function AuthNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SignIn"
            >
                <Stack.Screen 
                name="SignIn" 
                component={SignInScreen}
                options={{
                    title: `${i18n.t('signIn.title')}`,
                    gestureEnabled: false,
                }}  
                />
                <Stack.Screen 
                name="SignUp" 
                component={SignUpScreen}
                options={{
                    title: `${i18n.t('signUp.title')}`,
                }}   
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { AuthNavigator }