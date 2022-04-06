import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';

const CustomMapView = ({color, vehicleType, CloseStationInfo, OpenStationInfo, mapFilter, routeActivate, ActivateRoute}) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC7PdTftO4QxOyM8vu3fSOCMlvOcuVmbk0';

    const [location,setLocation] = useState({
        latitude:41.3887900,
        longitude:2.1589900,
        latitudeDelta:0.01,
        longitudeDelta:0.01
      });

      const [filter, setFilter] = useState('');
      
      

      var stationColors = [
        '#629C44', //VERDE (>=90%)
        '#FFE608', //AMARILLO (>= 70%)
        '#FF930F', //NARANJA (>= 1)
        '#D41F31', //ROJO (0)
        '#878787', //GRIS (?),
        '#1D69A6'  //AZUL

    ]
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
      //0 -> Available, 1 -> Occupied, 2 -> Faulted, 
      //3 -> Unavailable, 4 -> Reserved, 5 -> Charging

      const mapRef = useRef(null);
      const centerPosition = () => {
        mapRef.current.animateToRegion(
          location
        , 1500)
      }


      const [chargePoints, setChargePoints] = useState([]);

      const {getChargePoints, getSingleChargePoint} = useChargePoints();
      const pinColor = '#000000';

      useEffect(() => {
        (async () => { 
         
          if(mapFilter != "singleCharge"){
             let infoPuntosCarga = await getChargePoints(mapFilter);
             let arrayPuntos = Object.entries(infoPuntosCarga);
             setChargePoints(arrayPuntos)
          }
          else{      
             let aux = chargePoints?.filter(markers => markers[1].id == routeActivate.id);
             setChargePoints(aux);            

          }
            })();
      },[mapFilter]);

    

      function GetColorStation (station) {
        if(station !== null) {
          let availableStations = 0;
          let countStations = 0;
          if(station.objectType == "bikeStation") {
            return '#1D69A6';
          }
          if(station.objectType == "vehicleStation") {
            countStations = station.data.sockets.length;
            for (let i = 0; i < countStations; ++i) {
              if(station.data.sockets[i].socket_state == 0) {
                availableStations++;
              }
            }
          }
          if(availableStations / countStations >= 0.9) {
            return stationColors[0];
          }
          if(availableStations / countStations >= 0.7) {
            return stationColors[1];
          }
          else if(availableStations >= 1) {
            return stationColors[2];
          }
          else {
            return stationColors[3];
          }
        }
      }

    return (
        <View style ={styles.mapContent}> 
          <MapView style ={styles.map} ref={mapRef}
            onPress={ () =>{
            CloseStationInfo();
            ActivateRoute(null);
            }
          }
            initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              }}
            
          > 
          
          {routeActivate!=null?
            <MapViewDirections
             origin={location}
             destination={{latitude:routeActivate.latitude, longitude:routeActivate.longitude}}
             apikey={GOOGLE_MAPS_APIKEY}
             strokeWidth={3}
             strokeColor="hotpink"
        />
          : <View/>}
              {chargePoints.map(chargePoint => 
                <Marker 
                  key={chargePoint[1].id}
                  onPress={ () => {
                    OpenStationInfo(chargePoint[1]);
                   
                  }}
                  pinColor={GetColorStation(chargePoint[1])}
                  coordinate={
                    {latitude: chargePoint[1].lat, longitude:chargePoint[1].lng }}
                  title={chargePoint[1].name}
                />  
              )}
              <Marker 
                coordinate={{
                latitude: latitude, longitude: longitude
              }}
              //icon= {require('../../../../assets/images/carTypes/icons/carType_7.png')}
              >
                <Image
                  source = {(vehicleType ?? require( '../../../../assets/images/carTypes/icons/carType_0.png'))}
                  style = {[{tintColor: (color ?? '#DDDDDD')}, {zIndex: 100}]}
                />
              </Marker>
              
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
    floatingButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignContent: 'center',
      width: 60,
      height: 60,
      bottom: 25,
      right: 25
    }
})

export { CustomMapView };