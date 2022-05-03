import React from "react";
import i18n from "i18n-js";
import { StyleSheet, Pressable, View, Image, Text } from "react-native";

function BikeStationInfo(props) {
  return (
    <View style={styles.bikeStationContent}>
      <View style={styles.bikeContent}>
        <View style={styles.bikeSlotType}>
          <Image
            source={require("../../../../../assets/images/icons/mechanical.png")}
            style={styles.vehicleIcon}
          />
          <Text style={styles.stationBikeText}>
            {props.stationInfo.data.sockets[0].available_mechanical}{" "}
            {i18n.t("locationInfo.mechanical")}
          </Text>
        </View>
        <View style={styles.bikeSlotType}>
          <Image
            source={require("../../../../../assets/images/icons/electrical.png")}
            style={styles.vehicleIcon}
          />
          <Text style={styles.stationBikeText}>
            {props.stationInfo.data.sockets[0].available_electrical}{" "}
            {i18n.t("locationInfo.electrical")}
          </Text>
        </View>
        <View style={styles.bikeSlotType}>
          <Image
            source={require("../../../../../assets/images/icons/parking.png")}
            style={styles.vehicleIcon}
          />
          <Text style={styles.stationBikeText}>
            {props.stationInfo.data.sockets[0].available_sockets}{" "}
            {i18n.t("locationInfo.parking")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bikeStationContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "100%",
  },
  bikeSlotType: {
    alignItems: "center",
  },
  bikeContent: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  vehicleIcon: {
    height: 40,
    width: 40,
    marginTop: 10,
    marginLeft: 5,
  },
  stationBikeText: {
    marginTop: 10,
  },
  favouriteButton: {
    marginLeft: "auto",
  },
});

export default BikeStationInfo;
