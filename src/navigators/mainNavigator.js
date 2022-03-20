import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, SettingsScreen, ProfileScreen } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from 'i18n-js';

const Tab = createBottomTabNavigator();
function MainNavigator(){


    return(
        <Tab.Navigator initialRouteName="Map">
            <Tab.Screen 
                name="Map"
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
    )
}

export { MainNavigator }