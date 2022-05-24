import MapViewDirections from 'react-native-maps-directions';
import React, {useState, useEffect} from "react";
import {API_KEY} from '@env';
import { TransitionPresets } from '@react-navigation/stack';
export default ({routeActivate, location, ChangeRoutingInfo}) => {
    const destination = {latitude:routeActivate.latitude, longitude:routeActivate.longitude};
    //const currentTransport = routeActivate.objectType == "vehicleStation" ? "DRIVING" : "BICYCLING";
    const [lineStyle, setLineStyle] = useState({width: 3, dash:null, mode:"DRIVING", color: "red"})
    
    const [currentTransport, setCurrentTransport] = useState("DRIVING");
    
    useEffect(() =>{       
        changeLine(routeActivate)
    }, [routeActivate])

    
    const changeLine = (userPreferences) =>{
        if (userPreferences !== null){
            if(userPreferences.objectType == "bikeStation") {
                setLineStyle({width:3, dash:null, mode:"BICYCLING", color:"green"})
                setCurrentTransport("BICYCLING")
            }
            if(userPreferences.objectType == "vehicleStation") {
                setLineStyle({width:3, dash:null, mode:"DRIVING", color:"blue"})
                setCurrentTransport("DRIVING")
            }
            if(userPreferences.objectType == "walk") {
                setLineStyle({width:7, dash:[10.10], mode:"WALKING", color:"hotpink"})
                setCurrentTransport("WALKING")
            }
            if(userPreferences.objectType == "transport") {
                setLineStyle({width:3, dash:null, mode:"TRANSIT", color:"red"})
                setCurrentTransport("TRANSIT")

            }
        }
    }
    return(
       
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
                duration:result.duration,
                transport: currentTransport,
                })
            }
            />
       
    )
    
}