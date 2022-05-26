import i18n from "i18n-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import ChargeStationInfo from "./stationComponents/chargeStationInfo";
import BikeStationInfo from "./stationComponents/bikeStationInfo";
import CustomButton from "../../../utils/button"
import useUserSettings from "../../../hooks/useUserSettings";
import Button from "../../../utils/button";

function RoutesInfo(props) {
  useUserSettings();
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

  const prettifyTime = (time) => {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    if(hours > 0) return `${hours} h ${Math.floor(minutes)} min`;
    else return `${Math.round(minutes)} min`;
  }

  const prettifyDistance = (distance) => {
    let km = Math.round(distance * 10) / 10;
    return `${km} km`;
  }

  const customStyle = require("../../../utils/customStyleSheet");

  return (
    <View style={routeInfoStyle}>
      <View style={[customStyle.coolBlockTitleContainer]}>
        <View style={{width: '100%'}}>
          <Text style={[customStyle.title, {textAlignVertical: 'center'}]}>
            {i18n.t("home.routeOptions")}
          </Text>
        </View>
      </View>
      <View style={[styles.goThereContent]}>
          <CustomButton
              customStyles={(props?.routingInfo?.transport == "DRIVING") ? styles.goThereButtonSelected : styles.goThereButton}
              imageSrc={require("../../../../assets/images/icons/carIcon.png")}
              imageStyle={[{ width: "75%", height: "75%", tintColor: "black" }]}
              //text={i18n.t("home.car")}
              routeActivate={props.routeActivate}
              onPress={() => {
                props.ActivateRoute({
                  latitude:props?.routeActivate?.latitude,
                  longitude: props?.routeActivate?.longitude,
                  id: props?.routeActivate?.id,
                  objectType: "vehicleStation",
                });   
              }}
          />
          <CustomButton
            customStyles={(props?.routingInfo?.transport == "BICYCLING") ? styles.goThereButtonSelected : styles.goThereButton}
            imageSrc={require("../../../../assets/images/icons/bike.png")}
            imageStyle={[{ width: "65%", height: "65%", tintColor: "black" }]}
            //text={i18n.t("home.bike")}
            routeActivate={props.routeActivate}
            onPress={() => {       
              props.ActivateRoute({
                latitude:props?.routeActivate?.latitude,
                longitude: props?.routeActivate?.longitude,
                id: props?.routeActivate?.id,
                objectType: "bikeStation",
              });               
            }}
          />
          <CustomButton
            customStyles={(props?.routingInfo?.transport == "WALKING") ? styles.goThereButtonSelected : styles.goThereButton}
            imageSrc={require("../../../../assets/images/icons/walking.png")}
            imageStyle={[{ width: "75%", height: "75%", tintColor: "black" }]}
            routeActivate={props.routeActivate}
            //text={i18n.t("home.foot")}
            onPress={() => {          
              props.ActivateRoute({
                latitude:props?.routeActivate?.latitude,
                longitude: props?.routeActivate?.longitude,
                id: props?.routeActivate?.id,
                objectType: "walk",
              });           
            }}
          />

        </View>
        <View style={styles.routeInfoContent}>
          <View style={styles.infoContainer}>
            <View style={{width: '100%', height: '30%'}}>
              <Text style={[customStyle.normalText, {alignSelf:"center"}]}>
                  {i18n.t("home.time")}:
              </Text>
            </View>
            <Text style={[customStyle.normalText, {alignSelf:"center", fontSize: 25}]}>
              {prettifyTime(props?.routingInfo?.duration)}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={{width: '100%', height: '30%'}}>
              <Text style={[customStyle.normalText, {alignSelf:"center"}]}>
                  {i18n.t("home.distance")}:
              </Text>
            </View>
            <Text style={[customStyle.normalText, {alignSelf:"center", fontSize: 25}]}>
              {prettifyDistance(props?.routingInfo?.distance)}
            </Text>
          </View>
        </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  routeInfoOpened: {
    height: "30%",
    minHeight: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#eae4f6",
    borderBottomColor: "transparent",
    top: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
  },
  routeInfoClosed: {
    height: "0%",
    width: "0%",
  },
  goThereContent: {
    width: "90%",
    height: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: "2%",
  },  
  infoContainer: {
    width: "45%",
    height: "90%",
    padding: 0,
    borderWidth: 2,
    borderColor: "#eae4f6",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: "2%",
  },
  goThereButton: {
    backgroundColor: "#f3edff",
    width: undefined,
    height: '90%',
    aspectRatio: 1,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: "5%",
    zIndex: 11,
  },
  goThereButtonSelected: {
    backgroundColor: "#f3edff",
    width: undefined,
    height: '90%',
    aspectRatio: 1,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: "5%",
    borderColor: "#b28dfc",
    borderWidth: 3,
    zIndex: 11,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  routeInfo:{
    width: "100%",
    height: "20%",
    marginTop: "5%",

  },
  routeInfoContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "2%",
    marginHorizontal: "2%",
    height: "40%",
  },
});
export { RoutesInfo };