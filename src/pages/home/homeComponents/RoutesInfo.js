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
  
  const [selectedMode, setSelectedMode] = useState('car');

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
    let seconds = Math.floor((time % 1) * 60);
    if(hours > 0) return `${hours} h ${Math.floor(minutes)} min`;
    else return `${Math.floor(minutes)} min ${seconds} s`;
  }

  const prettifyDistance = (distance) => {
    let km = Math.round(distance * 100) / 100
    return `${km} km`;
  }



  const customStyle = require("../../../utils/customStyleSheet");

  return (
    <View style={routeInfoStyle}>
      <View style={[customStyle.coolBlockTitleContainer]}>
        <View style={{width: '100%'}}>
          <Text style={[customStyle.title, {textAlignVertical: 'center'}]}>
            Route options
          </Text>
        </View>
      </View>
      <View style={[styles.goThereContent]}>
          {/* <Button
            onPress={() => {
              console.log("A");
            }}
          />
          <CustomButton
              onPress={() => {
                console.log('car')
              }}
              customStyles={(selectedMode == 'car') ? styles.goThereButtonSelected : styles.goThereButton}
              text='A'
          /> */}
          <CustomButton
              customStyles={(selectedMode == 'car') ? styles.goThereButtonSelected : styles.goThereButton}
              imageSrc={require("../../../../assets/images/icons/carIcon.png")}
              imageStyle={[{ width: "75%", height: "75%", tintColor: "black" }]}
              //text={i18n.t("home.car")}
              routeActivate={props.routeActivate}
              onPress={() => {
                setSelectedMode('car');
                props.ActivateRoute({
                  latitude:props?.routeActivate?.latitude,
                  longitude: props?.routeActivate?.longitude,
                  id: props?.routeActivate?.id,
                  objectType: "vehicleStation"
                });   
              }}
          />
          <CustomButton
            customStyles={(selectedMode == 'bike') ? styles.goThereButtonSelected : styles.goThereButton}
            imageSrc={require("../../../../assets/images/icons/bike.png")}
            imageStyle={[{ width: "65%", height: "65%", tintColor: "black" }]}
            //text={i18n.t("home.bike")}
            routeActivate={props.routeActivate}
            onPress={() => {
              setSelectedMode('bike');              
              props.ActivateRoute({
                latitude:props?.routeActivate?.latitude,
                longitude: props?.routeActivate?.longitude,
                id: props?.routeActivate?.id,
                objectType: "bikeStation"
              });               
            }}
          />
          <CustomButton
            customStyles={(selectedMode == 'walk') ? styles.goThereButtonSelected : styles.goThereButton}
            imageSrc={require("../../../../assets/images/icons/walking.png")}
            imageStyle={[{ width: "75%", height: "75%", tintColor: "black" }]}
            routeActivate={props.routeActivate}
            //text={i18n.t("home.foot")}
            onPress={() => {
              setSelectedMode('walk');              
              props.ActivateRoute({
                latitude:props?.routeActivate?.latitude,
                longitude: props?.routeActivate?.longitude,
                id: props?.routeActivate?.id,
                objectType: "walk"
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






{/*       <View style={[{width: "100%", height:"10%"}]}>
          <Text style={[customStyle.bigTitle, {width:"100%"}]}>
            {i18n.t("home.routeOptions")}
          </Text>
      </View> */}
      {/* <View style={[{flexDirection: "column", height: "50%", justifyContent: "space-around"}]}>
        <View style={styles.goThereContent}>
          <CustomButton
              customStyles={styles.goThereButton}
              imageSrc={require("../../../../assets/images/icons/carIcon.png")}
              imageStyle={[{ width: "75%", height: "75%", tintColor: "black" }]}
              //text={i18n.t("home.car")}
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
            imageSrc={require("../../../../assets/images/icons/bike.png")}
            imageStyle={[{ width: "65%", height: "65%", tintColor: "black" }]}
            //text={i18n.t("home.bike")}
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
              imageSrc={require("../../../../assets/images/icons/walking.png")}
              imageStyle={[{ width: "75%", height: "75%", tintColor: "black" }]}
              //text={i18n.t("home.foot")}
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
        </View>
        <View style={styles.infoContainer}>
          <View style={{width: '100%', height: '50%'}}>
            <Text style={[customStyle.normalText, styles.polutionTitle]}>
                {i18n.t("locationInfo.pollutionLevel")}
            </Text>
          </View>
          <Text style={{marginLeft: 10}}>AAA</Text>
        </View>
        <View style={styles.routeInfo}>
          <Text>{ i18n.t("home.time") + ": " + (props?.routingInfo?.duration) + " min" }</Text>
          <Text>{ i18n.t("home.distance") + ": " + (props?.routingInfo?.distance) + " km"}</Text>
        </View>
      </View>*/}
    </View> 
  );
}

const styles = StyleSheet.create({
  routeInfoOpened: {
    height: "30%",
    width: "100%",
    borderWidth: 1,
    borderColor: "#eae4f6",
    borderBottomColor: "transparent",
    top: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  routeInfoClosed: {
    height: "0%",
    width: "0%",
  },
  goThereContent: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: "2%",
  },  
  infoContainer: {
    width: "45%",
    height: "110%",
    padding: 0,
    borderWidth: 2,
    borderColor: "#eae4f6",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: "2%",
  },
  goThereButton: {
    backgroundColor: "#f3edff",
    width: "25%",
    height: 80,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: "5%",
  },
  goThereButtonSelected: {
    backgroundColor: "#f3edff",
    width: "25%",
    height: 80,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: "5%",
    borderColor: "#b28dfc",
    borderWidth: 3,
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
  },
});
export { RoutesInfo };