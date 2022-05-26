
import MapViewDirections from "react-native-maps-directions";
import i18n from "i18n-js";
import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { API_KEY } from "@env";
import { Marker } from "react-native-maps";
import useCloseStation from "../../../hooks/useCloseStation";


export default ({routeActivate, location, ChangeRoutingInfo}) => {
  const destination = {latitude:routeActivate.latitude, longitude:routeActivate.longitude};
  //const currentTransport = routeActivate.objectType == "vehicleStation" ? "DRIVING" : "BICYCLING";
  
  const [currentTransport, setCurrentTransport] = useState("DRIVING");

  const [lineStyle, setLineStyle] = useState({
      width: 3,
      dash: null,
      mode: "DRIVING",
      color: "red",
  });

  const [distancia, setDistancia] = useState(0);
  const [closestFree, setClosestFree] = useState({});
  const [autonomia, setAutonomia] = useState(1);
  const [needsCharge, setNeedsCharge] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setNeedsCharge(distancia > autonomia &&
      closestFree.nearest != null &&
      closestFree.nearest != undefined &&
      routeActivate?.objectType === "vehicleStation");

    changeLine(routeActivate);
  }, [closestFree]);

  useEffect(async() => {
    await getStationFree();
  }, [autonomia]);
  
  useEffect(() =>{   
    if(routeActivate.autonomy !== undefined){
      setAutonomia(routeActivate.autonomy);  
      console.log('autonomia: ', autonomia);
    }
    else {
      changeLine(routeActivate);
    }
  }, [routeActivate])

  const { getCloserStation } = useCloseStation();
  const { getCloserStationAvailable } = useCloseStation();
  

  useEffect(async () => {
    //getStation();
    getStationFree();
  }, []);

  const getStation = async () => {
    let stacion = await getCloserStation(
      location.latitude,
      location.longitude,
      1,
    );
    setClosestFree(stacion);
  };
  const getStationFree = async () => {
    let stacion = await getCloserStationAvailable(
      location.latitude,
      location.longitude,
      autonomia,
    );
    setClosestFree(stacion);
  };
    
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
  };

  const notification = () => {
      if (toastShown === false) {
        toast.show("", {
            title: i18n.t("warningToast.title"),
            message: i18n.t("warningToast.message"),
            type: "custom_type",
            location: "autonomia",
        });
        setToastShown(true);
      }
  };


  return (
    <View>
      {needsCharge && closestFree && closestFree.nearest && closestFree.nearest[0] ? (
        <Marker
          title={closestFree.nearest[0].name}
          coordinate={{
            latitude: closestFree.nearest[0].lat,
            longitude: closestFree.nearest[0].lng,
          }}
        >
          <Image
            source={require("../../../../assets/images/pins/normalPin.png")}
            style={styles.icon}
          />
        </Marker>
      ) : null}
      {needsCharge && closestFree && closestFree.nearest && closestFree.nearest[0] ? (
        <MapViewDirections
          origin={location}
          destination={destination}
          apikey={API_KEY}
          waypoints={[
            {
              latitude: closestFree.nearest[0].lat,
              longitude: closestFree.nearest[0].lng,
            },
          ]}
          splitWaypoints={true}
          optimizeWaypoints={true}
          mode={lineStyle.mode}
          strokeWidth={lineStyle.width}
          strokeColor={lineStyle.color}
          lineDashPattern={lineStyle.dash}
          timePrecision={"now"}
          onReady={(result) => {
            ChangeRoutingInfo({
              distance: result.distance,
              duration: result.duration,
            });
            setDistancia(result.distance);
          }}
        />
      ) : (
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
              distance: result.distance,
              duration: result.duration,
            });
            setDistancia(result.distance);
          }}
        />
      )}
    </View>
       
    )
    
}
const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 24,
  },
});