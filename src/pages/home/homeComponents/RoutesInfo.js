import i18n from "i18n-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import ChargeStationInfo from "./stationComponents/chargeStationInfo";
import BikeStationInfo from "./stationComponents/bikeStationInfo";
import CustomButton from "../../../utils/button"

function RoutesInfo(props) {
  
  const [routeInfoStyle, setRouteInfoStyle] = useState(
    styles.routeInfoClosed
  );
  
  useEffect(() => {
    if (props.routingInfo != null) {
      setRouteInfoStyle(styles.routeInfoOpened);
    } else {
      setRouteInfoStyle(styles.routeInfoClosed);
    }
  }, [props]);

  return (
    <View style={routeInfoStyle}>
      <View style={styles.goThereContent}>
        <CustomButton
            customStyles={styles.goThereButton}
            text={"coche"}
            routeActivate={props.routeActivate}
            onPress={() => {
              props.ActivateRoute({
              latitude:props?.routeActivate?.latitude,
              longitude: props?.routeActivate?.longitude,
              id: props?.routeActivate?.id,
              objectType: "vehicleStation"
              });   
            }}
        />
        <CustomButton
          customStyles={styles.goThereButton}
          text={"bici"}
          routeActivate={props.routeActivate}
          onPress={() => {
            props.ActivateRoute({
            latitude:props?.routeActivate?.latitude,
            longitude: props?.routeActivate?.longitude,
            id: props?.routeActivate?.id,
            objectType: "bikeStation"
            });               
          }}
        />
        <CustomButton
            customStyles={styles.goThereButton}
            text={"andando"}
            routeActivate={props.routeActivate}
            onPress={() => {
              props.ActivateRoute({
              latitude:props?.routeActivate?.latitude,
              longitude: props?.routeActivate?.longitude,
              id: props?.routeActivate?.id,
              objectType: "walk"
              });           
            }}
        />
        <CustomButton
            customStyles={styles.goThereButton}
            text={"transporte"}
            routeActivate={props.routeActivate}
            onPress={() => {
              props.ActivateRoute({
              latitude:props?.routeActivate?.latitude,
              longitude: props?.routeActivate?.longitude,
              id: props?.routeActivate?.id,
              objectType: "transport"
              });
            }}
        />
      </View>
      <View style={styles.routeInfo}>
        <Text>{ "Time:"+ (props?.routingInfo?.duration) + " min" }</Text>
        <Text>{ "Distance:"+ (props?.routingInfo?.distance) +"km"}</Text>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  routeInfoOpened: {
    height: 60,
    width: "100%",
    padding: 5,
  },
  routeInfoClosed: {
    height: 0,
    width: "100%",
  },
  goThereContent: {
    height: "50%",
    flexDirection: "row",
    marginLeft: "auto",
    marginTop: "auto",
    
  },
  goThereButton: {
    backgroundColor: "#1D69A6",
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  routeInfo:{
    width: "100%",

  }
});
export { RoutesInfo };