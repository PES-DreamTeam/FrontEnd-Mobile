import React, { Component, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Image, TouchableOpacity } from 'react-native';
import MapView, {  Marker } from 'react-native-maps';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';
import CustomButton from '../../../utils/button';
import MapPoints from './mapPoints';
import MapRoutes from './mapRoutes';

import useMap from "../../../hooks/useMap";

import { FilterMap } from './filterMap';


import useAuth from '../../../hooks/useAuth'
import carTypeImages from '../../../utils/carTypeImages';

const CustomMapView = ({color, vehicleType, CloseStationInfo, OpenStationInfo, isLoading,
  routeActivate, ActivateRoute, mapFilter, onChangeFilter, ChangeRoutingInfo, 
  stationInfoOpened, isSearching}) => {

  const {GetCarSmallImage} = carTypeImages();
  const { shownChargePoints, userLocation, currentStationInfo, recalcUserLocation } = useMap();

  const [isModalVisible, setModalVisible] = useState(false);
  const searchedPoint= {};

  const { auth } = useAuth();

  const initialRegion = {
    latitude:41.3887900,
    longitude:2.1589900,
    latitudeDelta:0.01,
    longitudeDelta:0.01
}

const OnBegin = (async () => {
  await recalcUserLocation();
    centerPosition();
    const intervalId = setInterval(() => {
      recalcUserLocation();
    }, 1000 * 10) 
    return () => clearInterval(intervalId)
  });

  

  useEffect(() => {
    OnBegin();
  }, [])
  useEffect(() => {
    centerPositionOnStation();
  }, [currentStationInfo]);

  //0 -> Available, 1 -> Occupied, 2 -> Faulted, 
  //3 -> Unavailable, 4 -> Reserved, 5 -> Charging

  const mapRef = useRef(null);
  
  const centerPosition = async () => {
    mapRef?.current?.animateToRegion(
      userLocation,
      1500)
  }

  const centerPositionOnStation = async () => {
    mapRef?.current?.animateToRegion(
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
          image={GetCarSmallImage(vehicleType, color)}
        >
        </Marker>
        
            
        </MapView>
        {!stationInfoOpened && !routeActivate && !isSearching &&
          !mapFilter.includes("singleCharge") ? 
        <FilterMap
          ChangeRoutingInfo={ChangeRoutingInfo}
          ActivateRoute={ActivateRoute}
        />
        : null
        } 
        {(!stationInfoOpened || routeActivate) && !isSearching ?
        <CustomButton
          customStyles={[styles.floatingButton, styles.rightFloat]}
          onPress={centerPosition}
          imageSrc={require('../../../../assets/images/icons/center.png')}
          imageStyle={{width: "60%", height: "60%"}}
        />
        : null
        }

        {/* When the route to point is activated */}
        {mapFilter.includes("singleCharge") && (!stationInfoOpened || routeActivate) ? 
          <CustomButton
            customStyles={[styles.floatingButton, styles.leftFloat]}
            onPress={cancelRoute}
            imageSrc={require('../../../../assets/images/icons/cancel.png')}
            imageStyle={{width: "40%", height: "40%"}}
          />
        : null}
        {
          isLoading ?
          <View style={styles.spinner}>
                <ActivityIndicator size={50} color="#b28dfc"/>
          </View>
          : null
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
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 5000,
    },
    floatingButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: '#ffffffaa',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 50,
      width: 50,
      height: 50,
      bottom:'15%',
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