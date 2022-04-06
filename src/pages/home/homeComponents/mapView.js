import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Image } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';
import MapButton from './mapButton';
import MapPoints from './mapPoints';

const CustomMapView = ({color, vehicleType, CloseStationInfo, OpenStationInfo, mapFilter, routeActivate, ActivateRoute, onChangeFilter}) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC7PdTftO4QxOyM8vu3fSOCMlvOcuVmbk0'; 
  
  const { getChargePoints } = useChargePoints();
  const [location,setLocation] = useState({
      latitude:41.3887900,
      longitude:2.1589900,
      latitudeDelta:0.01,
      longitudeDelta:0.01
  });
  const [isLoading, setIsLoading] = useState(false);

  const [chargePoints, setChargePoints] = useState([]);

  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  useEffect(async () => {
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
  }, []);

  useEffect(async () => {
    setIsLoading(true);
    setChargePoints([]);
    if(mapFilter != "singleCharge"){
        let infoPuntosCarga = await getChargePoints(mapFilter);
        let arrayPuntos = Object.entries(infoPuntosCarga);
        setChargePoints(arrayPuntos)
    }
    else{      
        let aux = chargePoints?.filter(markers => markers[1].id == routeActivate.id);
        setChargePoints(aux);            
    }
    setIsLoading(false);
  },[mapFilter]);

  const {latitude,longitude} = location;

  //0 -> Available, 1 -> Occupied, 2 -> Faulted, 
  //3 -> Unavailable, 4 -> Reserved, 5 -> Charging

  const mapRef = useRef(null);
  const centerPosition = () => {
    mapRef.current.animateToRegion(
      location
    , 1500)
  }

  const cancelRoute = () => {
    ActivateRoute(null);
    onChangeFilter('all');
  }

  return (
      <View style ={styles.mapContent}> 
        <MapView style ={styles.map} ref={mapRef}
          onPress={ () =>{
            CloseStationInfo();
          }}
          initialRegion={initialRegion}
        > 
          { routeActivate ?
            <MapViewDirections
              origin={location}
              destination={{latitude:routeActivate.latitude, longitude:routeActivate.longitude}}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          : null}

            <MapPoints
              chargePoints={chargePoints}
              OpenStationInfo={OpenStationInfo}
            />           
            <Marker 
              coordinate={{
                latitude: latitude, longitude: longitude
              }}
            >
              <Image
                source = {(vehicleType ?? require( '../../../../assets/images/carTypes/icons/carType_0.png'))}
                style = {[{tintColor: (color ?? '#DDDDDD')}, {zIndex: 100}]}
              />
            </Marker>
            
        </MapView>
        <MapButton
          styles={[styles.floatingButton, styles.rightFloat]}
          onPress={centerPosition}
          source={require('../../../../assets/images/center.png')}
        />

        {/* When the route to point is activated */}
        {mapFilter == "singleCharge" ? 
          <MapButton
            styles={[styles.floatingButton, styles.leftFloat]}
            onPress={cancelRoute}
            source={require('../../../../assets/images/cancel.png')}
          />
        : null}

        {isLoading ?
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="blue"/>
          </View>
          :null 
        }
     
      </View>
  );
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      flex: 1
    },
    mapMarker: {
      height: 32,
      width: 64,
      alignSelf: 'center',
      position:'relative',

      left: 0,
      right: 0
    
    },
    mapContent: {
      flex: 1,
      width: '100%',
    }, 
    spinner:{
      position: 'absolute',
      justifyContent: 'center',
      top:0,
      left:0,
      right: 0,
      bottom: 0,
    },
    floatingButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignContent: 'center',
      width: 60,
      height: 60,
      bottom:25,
    },
    rightFloat: {
      right: 25
    },
    leftFloat: {
      left: 25
    }
})

export { CustomMapView };