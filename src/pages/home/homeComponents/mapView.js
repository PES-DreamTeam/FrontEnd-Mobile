import React, { Component, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Image } from 'react-native';
import MapView, {  Marker } from 'react-native-maps';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';
import MapButton from './mapButton';
import MapPoints from './mapPoints';
import MapRoutes from './mapRoutes';

import useMap from "../../../hooks/useMap";

import SearchBar from './searchBar';
import useAuth from '../../../hooks/useAuth'

const CustomMapView = ({color, vehicleType, CloseStationInfo, OpenStationInfo, routeActivate, ActivateRoute, mapFilter, onChangeFilter, ChangeRoutingInfo}) => {

  const { shownChargePoints, userLocation } = useMap();

  const handleOnSearch = (nameStation) =>{
    let stationSearched = shownChargePoints.filter(current => current[1].name  === nameStation);    
    let statlocation = {latitude:stationSearched[0][1].lat, longitude:stationSearched[0][1].lng, latitudeDelta:0.01, longitudeDelta:0.01}
    setSearchedPoint(stationSearched[0][1].id);
    mapRef.current.animateToRegion(statlocation, 1500)
    OpenStationInfo(stationSearched[0][1]);
  }
  const searchedPoint= {};
  const isLoading = false;

  const { auth } = useAuth();

  const initialRegion = {
    latitude:41.3887900,
    longitude:2.1589900,
    latitudeDelta:0.01,
    longitudeDelta:0.01
}

  

  useEffect(async () => {
    centerPosition();
  }, []);

  //0 -> Available, 1 -> Occupied, 2 -> Faulted, 
  //3 -> Unavailable, 4 -> Reserved, 5 -> Charging

  const mapRef = useRef(null);
  
  const centerPosition = () => {
    mapRef.current.animateToRegion(
      userLocation
    , 1500)
  }

  const cancelRoute = () => {
    ActivateRoute(null);
    onChangeFilter((mapFilter));
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
          initialRegion={initialRegion}
          CloseStationInfo();
        }}
      > 
        {routeActivate ? 
          <MapRoutes
          routeActivate={routeActivate}
          location={userLocation}
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
            latitude: userLocation?.latitude, longitude: userLocation?.longitude
          }}
        >
            <Image
              source = {(vehicleType ?? require( '../../../../assets/images/carTypes/icons/carType_8.png'))}
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