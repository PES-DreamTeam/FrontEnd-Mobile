import MapViewDirections from 'react-native-maps-directions';
import React, { Component, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Image, TouchableOpacity } from 'react-native';
import {API_KEY} from '@env';
import useCloseStation from "../../../hooks/useCloseStation";



export default ({routeActivate, location, ChangeRoutingInfo}) => {
    const destination = {latitude:routeActivate.latitude, longitude:routeActivate.longitude};
    const currentTransport = routeActivate.objectType == "vehicleStation" ? "DRIVING" : "BICYCLING";
    const [lineStyle, setLineStyle] = useState({width: 3, dash:null, mode:"DRIVING", color: "red"})
    let distancia = routeActivate.distancia;
    let autonomia =1;
    const isLoading = false;

    const closet={latitude:41.420061, longitude:2.201705}
 
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
            if(stacion != null && stacion != undefined){
                setStation(stacion)
            }
           
      }
        console.log(estation)
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


    return(

       
          <View>
              { distancia < autonomia ?
            <MapViewDirections
            origin={location}
            destination={destination}
            apikey={API_KEY}
            mode={lineStyle.mode}
            strokeWidth={lineStyle.width}
            strokeColor={lineStyle.color}
            lineDashPattern={lineStyle.dash}
            timePrecision={"now"}
            onReady={result => ChangeRoutingInfo({
                distance:result.distance, 
                duration:result.duration
                })
            }
            />
            :  <MapViewDirections
            origin={location}
            destination={destination}
            apikey={API_KEY}
            waypoints={[closet]}
            splitWaypoints={true}
            optimizeWaypoints={true}
            stopover={true}
            mode={lineStyle.mode}
            strokeWidth={lineStyle.width}
            strokeColor={lineStyle.color}
            lineDashPattern={lineStyle.dash}
            timePrecision={"now"}
            onReady={result => ChangeRoutingInfo({
                distance:result.distance, 
                duration:result.duration
                })
            }
            />
        }
     </View>
    );

}