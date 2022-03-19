import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './mainNavigator';
import { SettingsScreen, VehicleConfig } from '../pages';
import useAuth from '../hooks/useAuth';
const Drawer = createDrawerNavigator();

function SidebarNavigator (){

    const { auth } = useAuth();

    return(
        auth?.user?.isNew ? (
            <VehicleConfig/>
        ):
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={MainNavigator} options={{header:()=>null}}/>
                    <Drawer.Screen name="Settings" component={SettingsScreen}/>
                </Drawer.Navigator>
            </NavigationContainer>
    )
}

export {SidebarNavigator}