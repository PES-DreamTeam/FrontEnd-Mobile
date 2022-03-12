import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/authContext';
import useUserSettings from './hooks/useUserSettings';
import { SignInScreen, SignUpScreen, HomeScreen, SettingsScreen } from './pages/';
import i18n from 'i18n-js';

const Tab = createBottomTabNavigator();
const Stack =  createStackNavigator();


function Main() {
    const { auth } = useContext(AuthContext);

    return(
        !auth?.isSignedIn ?(
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
                <Tab.Navigator>
                    <Tab.Screen name={i18n.t('home.title')} component={HomeScreen} />
                    <Tab.Screen name={i18n.t('settings.title')} component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    )
}

export { Main }
