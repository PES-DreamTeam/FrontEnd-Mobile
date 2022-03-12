import { View, Text } from 'react-native';
import useUser from '../../hooks/useUser';
function HomeScreen() {
    const {getUserInfo} = useUser();
    getUserInfo();
    return(
        <View>
            <Text>Welcome from the Home Screen</Text>
        </View>
    )
}

export { HomeScreen }