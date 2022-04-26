import React, { Component, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Image } from 'react-native';
import MapView, {  Marker } from 'react-native-maps';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';
import MapButton from './mapButton';
import MapPoints from './mapPoints';
import MapRoutes from './mapRoutes';
import SearchBar from './searchBar';
import useAuth from '../../../hooks/useAuth'

const CustomMapView = ({color, vehicleType, CloseStationInfo, OpenStationInfo, routeActivate, ActivateRoute, mapFilter, onChangeFilter, ChangeRoutingInfo}) => {

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
  const [searchedPoint, setSearchedPoint] = useState(null);
  const [searchType, setSearchType] = useState(null);

  const handleOnSearch = (nameStation) =>{
    let stationSearched = shownChargePoints.filter(current => current[1].name  === nameStation);    
    let statlocation = {latitude:stationSearched[0][1].lat, longitude:stationSearched[0][1].lng, latitudeDelta:0.01, longitudeDelta:0.01}
    setSearchedPoint(stationSearched[0][1].id);
    mapRef.current.animateToRegion(statlocation, 1500)
    OpenStationInfo(stationSearched[0][1]);
  }

  const { auth } = useAuth();

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
    
    const interval = setInterval(async () => {
      /*let chargePoints = await getChargePoints(mapFilter);
      let arrayPuntos = Object.entries(chargePoints);
      setChargePoints(arrayPuntos);*/
    }, 60000);
    return () => clearInterval(interval); 
  }, []);


  useEffect(async () => {
    if(mapFilter.includes("singleCharge")){
        let aux = chargePoints?.filter(markers => markers[1].id == routeActivate.id)
        setShown(aux);
    }
    else{
      setIsLoading(true);
      console.log("Filter changed to: " + mapFilter);
      //console.log(auth?.user);
      let pointsToShow = await getChargePoints(mapFilter, auth?.user?._id);
      let temp = Object.entries(pointsToShow);
      setChargePoints(temp);
      setShown(temp);
      setIsLoading(false);
    }
  }, [mapFilter]);

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
    console.log(mapFilter)
    ActivateRoute(null);
    onChangeFilter('singleCharge');
    ChangeRoutingInfo(null);
  }

  return (
      <View style ={styles.mapContent}>
      
       <SearchBar 
       shownChargePoints={shownChargePoints}
       handleOnSearch={handleOnSearch}
       routeActivate={routeActivate}
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
          searchedPoint={searchedPoint}
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
        {mapFilter.includes("singleCharge") ? 
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
})

export {CustomMapView};