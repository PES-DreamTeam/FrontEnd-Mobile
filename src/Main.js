import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SignInScreen, SignUpScreen, HomeScreen, SettingsScreen, VehicleConfig } from './pages/';
import useAuth from './hooks/useAuth';
import i18n from 'i18n-js';

const Tab = createBottomTabNavigator();
const Stack =  createStackNavigator();


function Main() {
    const { isSignedIn } = useAuth();

    return(
        !isSignedIn() ?(
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
        ) : ( 
            <NavigationContainer>
                <Tab.Navigator initialRouteName="initialRouteName">
                <Tab.Screen 
                        name="initialRouteName"
                        component={VehicleConfig} 
                        options={{
                            title: `${i18n.t('vehicleConfig.title')}`,
                            headerShown: false
                        }}
                    />
                    <Tab.Screen 
                        name="Home"
                        component={HomeScreen} 
                        options={{
                            title: `${i18n.t('home.title')}`,
                            headerShown: false
                        }}
                    />
                    <Tab.Screen 
                        name="Settings"
                        component={SettingsScreen} 
                        options={{
                            title: `${i18n.t('settings.title')}`,
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        )
    )
}

export { Main }
