import MapViewDirections from 'react-native-maps-directions';
import React, {useState, useEffect} from "react";
export default ({routeActivate, location, ChangeRoutingInfo}) => {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyC7PdTftO4QxOyM8vu3fSOCMlvOcuVmbk0'; 
    const destination = {latitude:routeActivate.latitude, longitude:routeActivate.longitude};
    const currentTransport = routeActivate.objectType == "vehicleStation" ? "DRIVING" : "BICYCLING";
    const [lineStyle, setLineStyle] = useState({width: 3, dash:null, mode:"DRIVING", color: "red"})


    useEffect(() =>{       
        changeLine(routeActivate)
    }, [routeActivate])

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
       
            <MapViewDirections
            origin={location}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
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
       
    )
    
}