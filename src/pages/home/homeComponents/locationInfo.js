import i18n from "i18n-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, View, Text, Share } from "react-native";
import GenericLocationInfo from "./stationComponents/genericLocationInfo";
import ReportStationModal from "./stationComponents/reportStationModal";
import CustomButton from "../../../utils/button";

import LocationModal from "./stationComponents/locationModal";
import useAchievements from "../../../hooks/useAchievements";
import useExternalService from "../../../hooks/useExternalService";

function LocationInfo(props) {
  const { updateAchievement } = useAchievements();
  const { getStationPollution } = useExternalService();

  const [stationInfoStyle, setStationInfoStyle] = useState(
    styles.locationInfoClosed
  );
  const [modalButtonStyle, setModalButtonStyle] = useState(
    styles.locationInfoClosed
  );
  const [locationModalOpened, setLocationModalOpened] = useState(false);
  const [reportStationVisible, setReportStationVisible] = useState(false);
  const [pollution, setPollution] = useState();
  const [pollutionColor, setPollutionColor] = useState("#fff300");

  const ChargeStationIcon = (chargerType) => {};

  const ReportStation = (stationInfo) => {
  };

  const shareStation = async (stationInfo) => {
    const message = `${i18n.t("locationInfo.shareMessage")}` + " '" + stationInfo.name + "'" + `${i18n.t("locationInfo.shareMessage2")}`
                  + "\n\n" +"https://maps.google.com/?q=" + stationInfo.lat + "," + stationInfo.lng;
    const shareOptions = {
      message: message,
    };
    try {
      const shareResponse = await Share.share(shareOptions);
      if (shareResponse.action === Share.sharedAction) {
        //updateAchievement(1, 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function perc2color(perc) {
    perc *= 4;
    perc = 100 - perc;
    let r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    let h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  }

  useEffect(async () => {
    if (props.stationInfo != null && (props.routeActivate === null || props.routeActivate === undefined)) {
      setStationInfoStyle(styles.locationInfoOpened);
      setModalButtonStyle(styles.locationModalButton);
      let temp = await getStationPollution(
        props?.stationInfo?.lat,
        props?.stationInfo?.lng
      );
      if(temp == null || temp == undefined){
        setPollution(i18n.t('miscelaneus.loading'));
        setPollutionColor("#ffffff");
      }else{
        temp *= 100;
        temp = Math.round(temp * 100) / 100;
        setPollution(temp);
        setPollutionColor(perc2color(temp));
      }
    } else {
      setStationInfoStyle(styles.locationInfoClosed);
      setModalButtonStyle(styles.locationInfoClosed);
    }
  }, [props]);

  return (
    <View style={stationInfoStyle}>
      <View style={styles.locationAddressContent}>
        <Text style={[styles.locationAddressName]}>
          {props?.stationInfo?.address}
        </Text>
        <CustomButton
          text="· · ·"
          customStyles={modalButtonStyle}
          onPress={() => setLocationModalOpened(true)}
        />
      </View>
      <View style={styles.locationInfo}>
        <GenericLocationInfo stationInfo={props?.stationInfo} />
      </View>

      <View style={styles.botBarContent}>
        <Text
          style={styles.pollutionText(pollutionColor)}
        >
          {i18n.t('locationInfo.pollutionLevel')}: {pollution}
        </Text>
        <CustomButton
          customStyles={styles.goThereButton}
          onPress={() => shareStation(props?.stationInfo)}
          text={i18n.t("locationInfo.shareStation")}
        />
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
            updateAchievement(2, 3);
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
    width: 0,
  },
  locationAddressName: {
    width: "80%",
    color: "#1D69A6",
  },
  locationModalButton: {
    width: 30,
    height: 30,
    borderRadius: 80,
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
  locationInfo: {
    height: "65%",
    width: "100%",
  },
  botBarContent: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
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
  pollutionText: pollutionColor => ({
    backgroundColor: pollutionColor,
    color: "black",
    alignSelf: "center",
    padding: "2%",
    borderRadius: 10,
  }),
});

export { LocationInfo };
