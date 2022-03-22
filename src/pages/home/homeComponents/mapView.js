import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';

const CustomMapView = ({color, onPress}) => {

    const [location,setLocation] = useState({
        latitude:41.3887900,
        longitude:2.1589900,
        latitudeDelta:0.01,
        longitudeDelta:0.01
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
            longitude: location.coords.longitude,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          })
    
        })();
      }, []);


      const mapRef = useRef(null);
      const centerPosition = () => {
        mapRef.current.animateToRegion(
          location
        , 1500)
      }


      const [chargePoints, setChargePoints] = useState([]);

      const {getChargePoints} = useChargePoints();
      getChargePoints();
      
 


     useEffect(() => {
      (async () => { 
        let infoPuntosCarga = await getChargePoints();
        let arrayPuntos = Object.entries(infoPuntosCarga);
        setChargePoints(arrayPuntos)
          })();
   },[]);

    return (
        <View style ={styles.mapContent}> 
          <MapView style ={styles.map} ref={mapRef}
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
 
              {chargePoints.map(chargePoint => 
                <Marker 
                  key={chargePoint[1].id}
                  coordinate={
                    {latitude: chargePoint[1].lat, longitude:chargePoint[1].lng }}
                  title={chargePoint[1].name}
                  description={chargePoint[1].address}
                  />
                  
                  
              )}
              
          </MapView>

          <Pressable 
          style={styles.floatingButton}
          onPress={centerPosition}
          >
            <Image
            source={require('../../../../assets/images/center.png')}
          />
          </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '100%',
    },
    mapContent: {
      flex: 1,
      width: '100%',
    }, 
    floatingButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignContent: 'center',
      width: 60,
      height: 60,
      bottom: 25,
      right: 25,
    }
})

export { CustomMapView };