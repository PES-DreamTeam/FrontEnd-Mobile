import React from "react";
import i18n from "i18n-js";
import { StyleSheet, Pressable, View, Image, Text } from "react-native";
import useUserSettings from "../../../../hooks/useUserSettings";
import CustomProgressBar from "../../../../utils/customProgressBar";

function BikeStationInfo(props) {
  const customStyle = require("../../../../utils/customStyleSheet");
  useUserSettings();

  const getColorAvailable = (available) => {
    const total = props.stationInfo.data.sockets[0].available_sockets+props.stationInfo.data.sockets[0].available_mechanical+props.stationInfo.data.sockets[0].available_electrical;
    if (available / total > 0.5) return "#2e942b";
    if (available / total > 0.25) return "#dec13e";
    return "#de3e44";
  }

  let mecahanicalFill = (props.stationInfo.data.sockets[0].available_mechanical / (props.stationInfo.data.sockets[0].available_sockets+props.stationInfo.data.sockets[0].available_mechanical+props.stationInfo.data.sockets[0].available_electrical) * 100 == 0) ?
                        {height: 20, minWidth: 0}
                        : {height: 20, minWidth: 13}

  let electricalFill = (props.stationInfo.data.sockets[0].available_electrical / (props.stationInfo.data.sockets[0].available_sockets+props.stationInfo.data.sockets[0].available_mechanical+props.stationInfo.data.sockets[0].available_electrical) * 100 == 0) ?
                       {height: 20, minWidth: 0}
                       : {height: 20, minWidth: 13}

  return (
    <View style={[styles.bikeStationContent]}>
      <View style={[styles.bikeInfo]}>
        <View style={[styles.bikeInfoLeft]}>
          <View style={{width: "45%", alignItems: "center"}}>
            <Image
              source={require("../../../../../assets/images/icons/mechanical.png")}
              style={styles.bikeIcon}
            />
            <Text style={[styles.bikeInfoText]}>
              {i18n.t("locationInfo.mechanical")}
            </Text>
          </View>
          <View style={{width: "45%", justifyContent: 'center'}}>
              <CustomProgressBar
                percent={props.stationInfo.data.sockets[0].available_mechanical / (props.stationInfo.data.sockets[0].available_sockets+props.stationInfo.data.sockets[0].available_mechanical+props.stationInfo.data.sockets[0].available_electrical) * 100}
                text={props.stationInfo.data.sockets[0].available_mechanical + "/" + (props.stationInfo.data.sockets[0].available_sockets+props.stationInfo.data.sockets[0].available_mechanical+props.stationInfo.data.sockets[0].available_electrical)}
                backgroundStyle={{height: 20, width: '100%'}}
                fillStyle={mecahanicalFill}
                textStyle={ {marginTop: -18}}
              />
          </View>
        </View>
        <View style={styles.bikeInfoRight}>
        <View style={{width: "45%", alignItems: "center"}}>
            <Image
              source={require("../../../../../assets/images/icons/electrical.png")}
              style={styles.bikeIcon}
            />
            <Text style={[styles.bikeInfoText]}>
            {i18n.t("locationInfo.electrical")}
            </Text>
          </View>
          <View style={{width: "45%", justifyContent: 'center'}}>
              <CustomProgressBar
                percent={props.stationInfo.data.sockets[0].available_electrical / (props.stationInfo.data.sockets[0].available_sockets+props.stationInfo.data.sockets[0].available_mechanical+props.stationInfo.data.sockets[0].available_electrical) * 100}
                text={props.stationInfo.data.sockets[0].available_electrical + "/" + (props.stationInfo.data.sockets[0].available_sockets+props.stationInfo.data.sockets[0].available_mechanical+props.stationInfo.data.sockets[0].available_electrical)}
                backgroundStyle={{height: 20, width: '100%'}}
                fillStyle={electricalFill}
                textStyle={{marginTop: -18}}
              />
          </View>
        </View>
      </View>
      <View style={[styles.parkingInfo, {flexDirection: "row", justifyContent: "center", alignItems: "center"}]}>
          <Image
              source={require("../../../../../assets/images/icons/parking.png")}
              style={[styles.vehicleIcon]}
          />
          <View style={{flexDirection: "row"}}>
            <Text style={[customStyle.title, {marginLeft: "5%", color: getColorAvailable(props.stationInfo.data.sockets[0].available_sockets)}]}>
              {props.stationInfo.data.sockets[0].available_sockets}
            </Text>
            <Text style={[styles.parkingInfoText, {marginLeft: "2%", marginBottom: 0}]}>
              {i18n.t("locationInfo.freeSlots")}
            </Text>

          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  bikeStationContent: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bikeInfo: {
    height: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bikeInfoLeft: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bikeInfoRight: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bikeInfoText: {
    fontSize: 15,
    color: "black",
    fontFamily: "Montserrat-Bold",
    alignSelf: "center",
  },
  parkingInfo: {
    height: "50%",
    width: "100%",
  },
  parkingInfoText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Montserrat-Bold",
    alignSelf: "center",
  },
  bikeIcon: {
    height: 40,
    width: 40,
    marginTop: 10,
    marginLeft: 5,
    aspectRatio: 1.5,
  },
  vehicleIcon: {
    height: 65,
    width: 65,
    marginTop: -5,
    marginLeft: 5,
  }
});

export default BikeStationInfo;
