import i18n from "i18n-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import GenericLocationInfo from "./stationComponents/genericLocationInfo";
import ReportStationModal from "./stationComponents/reportStationModal";
import CustomButton from "../../../utils/button";

import LocationModal from "./stationComponents/locationModal";

function LocationInfo(props) {
  const [stationInfoStyle, setStationInfoStyle] = useState(
    styles.locationInfoClosed
  );

  const [locationModalOpened, setLocationModalOpened] = useState(false);
  const [reportStationVisible, setReportStationVisible] = useState(false);

  const ChargeStationIcon = (chargerType) => {};

  const ReportStation = (stationInfo) => {
    console.log("Reporting station: ");
    console.log(stationInfo);
  };

  useEffect(async () => {
    if (props.stationInfo != null) {
      setStationInfoStyle(styles.locationInfoOpened);
      
    } else {
      setStationInfoStyle(styles.locationInfoClosed);
    }
  }, [props]);

  return (
    <View style={stationInfoStyle}>
      
      <View style={styles.locationAddressContent}>
        <Text style={[styles.locationAddressName]}>{props?.stationInfo?.address}</Text>
        <CustomButton
          text="..."
          customStyles={[styles.locationModalButton]}
          onPress={() => setLocationModalOpened(true)}
        />
      </View>
      <GenericLocationInfo
        stationInfo={props?.stationInfo}
      />
      <View style={styles.goThereContent}>
        <CustomButton
          customStyles={styles.goThereButton}
          onPress={() => {
            props.ActivateRoute({
              latitude: props?.stationInfo?.lat,
              longitude: props?.stationInfo?.lng,
              id: props?.stationInfo?.id,
              objectType: props?.stationInfo?.objectType,
            });
            props.onChangeFilter("singleCharge");
          }}
          text={i18n.t("locationInfo.getThere")}
        />
      </View>
      <LocationModal
        isVisible={locationModalOpened}
        stationInfo={props?.stationInfo}
        handleReport={() => setReportStationVisible(!reportStationVisible)}
        handleClose={() => setLocationModalOpened(false)}
        
      />
      <ReportStationModal
        isVisible={reportStationVisible}
        handleAccept={() => {
          setReportStationVisible(!reportStationVisible);
        }}
        handleCancel={() => setReportStationVisible(!reportStationVisible)}
        onPress={() => setReportStationVisible(!reportStationVisible)}
        title={i18n.t("report.reportStation.title")}
        stationID={props?.stationInfo?.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationInfoOpened: {
    height: "33%",
    width: "100%",
    padding: 5,
  },
  locationInfoClosed: {
    height: 0,
    width: "100%",
  },
  locationAddressName: {
    width: "80%",
    color: "#1D69A6",
  },
  locationModalButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },  
  locationAddressContent: {
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderEndColor: "grey",
  },
  highlightContent: {
    height: "65%",
    width: "100%",
  },
  goThereContent: {
    height: "15%",
    flexDirection: "row",
    marginLeft: "auto",
    marginTop: "auto",
  },
  goThereButton: {
    backgroundColor: "#1D69A6",
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    height: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export { LocationInfo };
