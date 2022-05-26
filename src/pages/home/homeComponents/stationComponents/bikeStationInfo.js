import React from "react";
import i18n from "i18n-js";
import { StyleSheet, Pressable, View, Image, Text } from "react-native";
import CustomProgressBar from "../../../../utils/customProgressBar";

function BikeStationInfo(props) {
  const customStyle = require("../../../../utils/customStyleSheet");

  return (
    <View style={[styles.bikeStationContent, {backgroundColor: "blue"}]}>
      <View style={[styles.bikeInfo, {backgroundColor: "red"}]}>
        <View style={[styles.bikeInfoLeft, {backgroundColor: "yellow"}]}>
          <View style={{width: "45%"}}>
            <Image
              source={require("../../../../../assets/images/icons/mechanical.png")}
              style={styles.vehicleIcon}
            />
          </View>
        </View>
        <View style={styles.bikeInfoRight}>

        </View>
      </View>
      <View style={[styles.parkingInfo, {backgroundColor: "green"}]}>

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
  parkingInfo: {
    height: "50%",
    width: "100%",
  },
  vehicleIcon: {
    height: 40,
    width: 40,
    marginTop: 10,
    marginLeft: 5,
  },
});

export default BikeStationInfo;
