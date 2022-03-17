import React,{useEffect, useState} from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { CustomMapView } from './homeComponents/';


export default function HomeScreen() {

  const [search, setSearch] = useState('');

  const onChangeText = (text) => {  
    setSearch(text);  
  }

  useEffect(() => {
    console.log(search) 
  }, [search]);

 
  return (
    
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable style={styles.topBarMenuButton}>
          <Image
            source={require('../../../assets/favicon.png')}
          />
        </Pressable>
        <TextInput
              onChangeText={(text) => onChangeText(text)}
              value={search}
              style={styles.searchBar}
              name="search"
              placeholder="Search:"
          />
      </View>
      <CustomMapView/>
    </View>
  );
  
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: 20,
    height: 60,
    width: Dimensions.get('window').width,
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center'
  },
  topBarMenuButton: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    justifyContent: "flex-end",
  },
  searchBar: {
    width: Dimensions.get('window').width - 160,
    borderRadius: 60,
    paddingLeft: 10,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  }
});

export {HomeScreen};