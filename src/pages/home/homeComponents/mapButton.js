import { Pressable, Image } from 'react-native';
export default ({styles, onPress, source}) => {
    return(
        <Pressable 
            style={styles}
            onPress={onPress}
        >
            <Image source={source}/>
        </Pressable>
    )
}