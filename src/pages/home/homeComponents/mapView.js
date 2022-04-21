import React, { Component, useEffect, useState, useRef } from 'react';
import {Dimensions, StyleSheet, ActivityIndicator, View, Image, TextInput, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';
import MapButton from './mapButton';
import MapPoints from './mapPoints';
import MapRoutes from './mapRoutes';
import SearchBar from './searchBar';
import i18n from 'i18n-js';
import Autocomplete from 'react-native-autocomplete-input';


const CustomMapView = ({color, vehicleType, CloseStationInfo, OpenStationInfo, mapFilter, routeActivate, ActivateRoute, onChangeFilter, ChangeRoutingInfo}) => {
  
  const { getChargePoints } = useChargePoints();
  const [location,setLocation] = useState({
      latitude:41.3887900,
      longitude:2.1589900,
      latitudeDelta:0.01,
      longitudeDelta:0.01
  });
  const [isLoading, setIsLoading] = useState(false);

  const [chargePoints, setChargePoints] = useState([]);

  const [shownChargePoints, setShown] = useState([]);

  const handleOnSearch = (nameStation) =>{
    let stationSearched = shownChargePoints.filter(current => current[1].name  === nameStation);
    //console.log(stationSearched[0][1]);
    
    let statlocation = {latitude:stationSearched[0][1].lat, longitude:stationSearched[0][1].lng, latitudeDelta:0.01, longitudeDelta:0.01}
    console.log(statlocation);
    //console.log(mapRef);
    mapRef.current.animateToRegion(statlocation, 1500)
    OpenStationInfo(stationSearched[0][1]);
  }

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

    let chargePoints = await getChargePoints('all');
    let arrayPuntos = Object.entries(chargePoints);
    setChargePoints(arrayPuntos);
    setShown(arrayPuntos);
    
    const interval = setInterval(async () => {
      let chargePoints = await getChargePoints('all');
      let arrayPuntos = Object.entries(chargePoints);
      setChargePoints(arrayPuntos);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(async () => {
    setIsLoading(true);
    if(mapFilter == "singleCharge"){
      let aux = chargePoints?.filter(markers => markers[1].id == routeActivate.id);
      setShown(aux);  
    }
    else if (mapFilter == "" || mapFilter == "all"){
      let aux = [...chargePoints];
      setShown(aux);
    }
    else{      
      let aux = chargePoints?.filter(markers => markers[1].objectType == mapFilter);
      setShown(aux);
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
    ChangeRoutingInfo(null);
  }

  return (
      <View style ={styles.mapContent}>
      
       <SearchBar 
       shownChargePoints={shownChargePoints}
       handleOnSearch={handleOnSearch}
       />



        <MapView style ={styles.map} ref={mapRef}
          onPress={ () =>{
            CloseStationInfo();
          }}
          initialRegion={initialRegion}
        > 
          {routeActivate ? 
            <MapRoutes
            routeActivate={routeActivate}
            location={location}
            ChangeRoutingInfo={ChangeRoutingInfo}
            />
          : null
          }

          <MapPoints
            chargePoints={shownChargePoints}
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
    },
    searchBar: {
      width: Dimensions.get('window').width - 160,
      borderRadius: 60,
      paddingLeft: 10,
      borderColor: 'gray',
      borderWidth: 1,
    
    },
})

export { CustomMapView };