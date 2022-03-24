import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './mainNavigator';
import { ProfileScreen, SettingsScreen, VehicleConfig } from '../pages';
import useAuth from '../hooks/useAuth';
import { CustomDrawer } from './customDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function SidebarNavigator (){

    const { auth } = useAuth();

    return(
        auth?.user?.isNew ? (
            <VehicleConfig/>
        ):
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={props => <CustomDrawer {...props} />}
                >
                    <Drawer.Screen name="Home" component={MainNavigator} 
                        options={{
                            header:()=>null, 
                            drawerIcon: ({color}) => (
                                <Ionicons name="home-outline" size={22} color={color} />
                            )                       
                        }}/>
                    <Stack.Screen name="Profile" component={ProfileScreen}
                          options={{
                            drawerIcon: ({color}) => (
                                <Ionicons name="person-outline" size={22} color={color} />
                            )                       
                        }}                                      
                    />
                    <Drawer.Screen name="Settings" component={SettingsScreen}
                         options={{
                            drawerIcon: ({color}) => (
                                <Ionicons name="settings-outline" size={22} color={color} />
                            )                       
                        }}                   
                    />
                    <Stack.Screen name="VehicleConfig" component={VehicleConfig}options={{drawerItemStyle: { display: "none" }}}/>
                </Drawer.Navigator>
                    
            </NavigationContainer>
    )
}

export {SidebarNavigator}