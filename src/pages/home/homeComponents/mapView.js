import React, { Component, useEffect, useState } from 'react';
import { StyleSheet  } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const CustomMapView = ({color, onPress}) => {

    const [location,setLocation] = useState({
        latitude:41.3887900,
        longitude:2.1589900
      })
    
      const {latitude,longitude} = location;

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
            
          })
    
        })();
      }, []);

    return (
        <MapView style ={styles.map} 
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
          <Marker 
            coordinate={{
            latitude: latitude, longitude: longitude
            }}
            image = {require('../../../../assets/images/carTypes/carType_0.png')}
            />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
    }
})

export { CustomMapView };