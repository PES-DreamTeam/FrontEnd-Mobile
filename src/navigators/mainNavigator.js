import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, SettingsScreen, ProfileScreen } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n-js';

const Tab = createBottomTabNavigator();
function MainNavigator(){

    return(
        <Tab.Navigator initialRouteName="Map"
        screenOptions={({ route }) => ({
            tabBarIcon: ({  color, size }) => {
              let iconName;
  
              if (route.name === 'Map') {
                iconName = 'map';
              } else if (route.name === 'Settings') {
                iconName = 'settings';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
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