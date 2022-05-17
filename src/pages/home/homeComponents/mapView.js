import React, { Component, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Image, TouchableOpacity } from 'react-native';
import MapView, {  Marker } from 'react-native-maps';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';
import MapButton from './mapButton';
import MapPoints from './mapPoints';
import MapRoutes from './mapRoutes';

import useMap from "../../../hooks/useMap";


import useAuth from '../../../hooks/useAuth'

const CustomMapView = ({color, vehicleType, CloseStationInfo, OpenStationInfo, routeActivate, ActivateRoute, mapFilter, onChangeFilter, ChangeRoutingInfo}) => {

  const { shownChargePoints, userLocation, currentStationInfo, recalcUserLocation } = useMap();

  
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
    await recalcUserLocation();
    centerPosition();
  }, []);

  useEffect(() => {
    centerPositionOnStation();
  }, [currentStationInfo]);

  //0 -> Available, 1 -> Occupied, 2 -> Faulted, 
  //3 -> Unavailable, 4 -> Reserved, 5 -> Charging

  const mapRef = useRef(null);
  
  const centerPosition = async () => {
    console.log("CENTER POSITION");
    mapRef.current.animateToRegion(
      userLocation,
      1500)
  }

  const centerPositionOnStation = async () => {
    console.log("CENTER ON STATION");
    mapRef.current.animateToRegion(
      {
      latitude:currentStationInfo?.lat,
        longitude:currentStationInfo?.lng,
        latitudeDelta:0.01,
        longitudeDelta:0.01
      }, 1500)
    }

  const cancelRoute = () => {
    ActivateRoute(null);
    onChangeFilter((mapFilter));
    ChangeRoutingInfo(null);
  }

  return (
      <View style ={styles.mapContent}>

      <MapView style ={styles.map} ref={mapRef} toolbarEnabled={false}
        onPress={ () =>{
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
      flex: 1,
      zIndex: 1,
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
      zIndex: 100,
    },
    rightFloat: {
      right: 25
    },
    leftFloat: {
      left: 25
    },
})

export {CustomMapView};