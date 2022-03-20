import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './mainNavigator';
import { ProfileScreen, SettingsScreen, VehicleConfig } from '../pages';
import useAuth from '../hooks/useAuth';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


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
                    <Stack.Screen name="VehicleConfig" component={VehicleConfig}options={{drawerItemStyle: { display: "none" }}}/>
                    <Stack.Screen name="Profile" component={ProfileScreen}/>
                </Drawer.Navigator>
                    
            </NavigationContainer>
    )
}

export {SidebarNavigator}