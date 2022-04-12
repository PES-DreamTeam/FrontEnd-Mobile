import i18n from "i18n-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import useAuth from "../../../hooks/useAuth";
import ChargeStationInfo from "./stationComponents/chargeStationInfo";
import BikeStationInfo from "./stationComponents/bikeStationInfo";
import ReportStationModal from "./stationComponents/reportStationModal";
import CustomButton from "../../../utils/button"

function LocationInfo(props) {
  const { auth, updateUser } = useAuth();
  const [isFavourite, toggleFavourite] = useState(
    auth.user?.favourite_stations?.includes(props?.stationInfo?.id)
  );
  const [stationInfoStyle, setStationInfoStyle] = useState(
    styles.locationInfoClosed
  );

  const [reportStationVisible, setReportStationVisible] = useState(false);



  useEffect(() => {
    if (props.stationInfo != null) {
      setStationInfoStyle(styles.locationInfoOpened);
    } else {
      setStationInfoStyle(styles.locationInfoClosed);
    }
  }, [props]);

  const handleFavourite = () => {
    toggleFavourite(!isFavourite);
    if (!isFavourite) {
      /* auth.user.favourite_stations = auth.user.favourite_stations.filter(id => id != stationInfo?.stationInfo?.id); */
      console.log("quito like");
    } else {
      /* auth.user.favourite_stations.push(stationInfo?.stationInfo?.id); */
      console.log("pongo like");
    }
    updateUser(auth.user);
  };

  const ChargeStationIcon = (chargerType) => {};

  const ReportStation = (stationInfo) => {
    console.log("Reporting station: ");
    console.log(stationInfo);
  };

  const HighlightInfo = () => {
    return <View style={styles.highlightContent}></View>;
  };

  const GenericLocationInfo = () => {
    switch (props?.stationInfo?.objectType) {
      case "vehicleStation":
        return (
          <ChargeStationInfo
            stationInfo={props.stationInfo}
            isFavourite={isFavourite}
            handleFavourite={handleFavourite}
          />
        );
      case "bikeStation":
        return (
          <BikeStationInfo
            stationInfo={props.stationInfo}
            isFavourite={isFavourite}
            handleFavourite={handleFavourite}
          />
        );
      default:
        return <HighlightInfo />;
    }
  };

  return (
    <View style={stationInfoStyle}>
      <View style={styles.locationAddressContent}>
        <Text style={{ color: "#1D69A6" }}>{props?.stationInfo?.address}</Text>
      </View>
      {GenericLocationInfo()}
      <View style={styles.goThereContent}>
        <CustomButton
            customStyles={styles.goThereButton}
            onPress={() => setReportStationVisible(!reportStationVisible)}
            text={i18n.t("locationInfo.report")}
        />
        <CustomButton
          customStyles={styles.goThereButton}
          onPress={() => {
            props.ActivateRoute({
              latitude: props?.stationInfo?.lat,
              longitude: props?.stationInfo?.lng,
              id: props?.stationInfo?.id,
            });
            props.onChangeFilter("singleCharge");
          }}
          text={i18n.t("locationInfo.getThere")}
        />
      </View>
      <ReportStationModal
      //tres botones:
        //reportar mal estado de la estacion
        //reportar información erronea
        //no me gusta, no he tenido buena experiencia
      //comentario extra
        isVisible={reportStationVisible}
        handleAccept={()=>{
          setReportStationVisible(!reportStationVisible);
        }} 
        handleCancel={()=>setReportStationVisible(!reportStationVisible)}
        onPress={()=> setReportStationVisible(!reportStationVisible)}
        title={i18n.t('report.reportStation.title')}
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
  locationAddressContent: {
    height: "15%",
    justifyContent: "center",
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
