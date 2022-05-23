import MapViewDirections from 'react-native-maps-directions';
import React, { Component, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Image, TouchableOpacity } from 'react-native';
import {API_KEY} from '@env';
import {  Marker } from 'react-native-maps';
import useCloseStation from "../../../hooks/useCloseStation";



export default ({routeActivate, location, ChangeRoutingInfo}) => {
    const destination = {latitude:routeActivate.latitude, longitude:routeActivate.longitude};
    const currentTransport = routeActivate.objectType == "vehicleStation" ? "DRIVING" : "BICYCLING";
    const [lineStyle, setLineStyle] = useState({width: 3, dash:null, mode:"DRIVING", color: "red"})
    const [distancia, setDistancia] = useState(0);
    const [closest, setClosest] = useState({});
    let autonomia = 3;
    const isLoading = false;

 
    useEffect(() =>{       
        changeLine(routeActivate)
    }, [routeActivate])
    
    const {getCloserStation} = useCloseStation();
    const [estation, setStation] = useState([]);
   
    useEffect(async () => {
        getStation()
      }, []);
      
    
      const getStation = async () => {
            let stacion = await getCloserStation(location.latitude, location.longitude,1) ;
           setClosest(stacion);
           
      }
        //console.log(estation)
      //console.log(estation?.nearest[0]?.lat)
    // const closet={latitude:estation?.nearest[0]?.lat, longitude:estation?.nearest[0]?.lng}
    
   
    
    const changeLine = (userPreferences) =>{
        if (userPreferences !== null){
            if(userPreferences.objectType == "bikeStation") {
                setLineStyle({width:3, dash:null, mode:"BICYCLING", color:"green"})
            }
            if(userPreferences.objectType == "vehicleStation") {
                setLineStyle({width:3, dash:null, mode:"DRIVING", color:"blue"})
            }
            if(userPreferences.objectType == "walk") {
                setLineStyle({width:7, dash:[10.10], mode:"WALKING", color:"hotpink"})
            }
            if(userPreferences.objectType == "transport") {
                setLineStyle({width:3, dash:null, mode:"TRANSIT", color:"red"})

            }
        }
    }
   

    const necesitaRecarga = distancia > autonomia && closest.nearest != null && closest.nearest != undefined; 
    return(
          <View>
              {necesitaRecarga ?
               <Marker 
               
                coordinate={{latitude: closest.nearest[0].lat, longitude: closest.nearest[0].lng}}
                >
                <Image
               source = {(require( '../../../../assets/images/icons/station.png'))}
               style={styles.icon}
               />
                </Marker>
         : null}
              { necesitaRecarga ?
              <MapViewDirections
              origin={location}
              destination={destination}
              apikey={API_KEY}
              waypoints={ [{latitude: closest.nearest[0].lat, longitude: closest.nearest[0].lng}] }
              splitWaypoints={true}
              optimizeWaypoints={true}
              mode={lineStyle.mode}
              strokeWidth={lineStyle.width}
              strokeColor={lineStyle.color}
              lineDashPattern={lineStyle.dash}
              timePrecision={"now"}
              onReady={(result) => {
                  ChangeRoutingInfo({
                      distance:result.distance, 
                      duration:result.duration,
                  })
                  setDistancia(result.distance)
              }}
              /> : 
            <MapViewDirections
            origin={location}
            destination={destination}
            apikey={API_KEY}
            mode={lineStyle.mode}
            strokeWidth={lineStyle.width}
            strokeColor={lineStyle.color}
            lineDashPattern={lineStyle.dash}
            timePrecision={"now"}
            onReady={(result) => {
                ChangeRoutingInfo({
                    distance:result.distance, 
                    duration:result.duration,
                })
                setDistancia(result.distance)
            }}
            />
            
        }
     </View>
    );
   
}
const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 24
    },
})
