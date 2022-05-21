import i18n from "i18n-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, View, Text, Share } from "react-native";
import GenericLocationInfo from "./stationComponents/genericLocationInfo";
import ReportStationModal from "./stationComponents/reportStationModal";
import CustomButton from "../../../utils/button";

import LocationModal from "./stationComponents/locationModal";
import useAchievements from "../../../hooks/useAchievements";
import useExternalService from "../../../hooks/useExternalService";

import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import useChargePoints from "../../../hooks/useChargePoints";
import CustomButtonTable from "../../../utils/buttonTable";

function LocationInfo(props) {

  const { auth, setAuth } = useAuth();
  const { sendFavourite } = useUser();
  const { getChargePointInfo, sendStationLike } = useChargePoints();

  const [isLiked, toggleLiked] = useState();
  const [isFavourite, toggleFavourite] = useState();
  const [stationLikes, setStationLikes] = useState();
  const [stationReports, setStationReports] = useState();

  useEffect(async () => {
    if (props.stationInfo != null) {
      let info = await getChargePointInfo(props?.stationInfo?.id);
      setStationLikes(info.likes);
      setStationReports(info.reports);
      
    } 
  }, [props]);

  useEffect(() => {
      if (props.stationInfo != null) {
          toggleFavourite(
              auth?.user?.favourites?.includes(props?.stationInfo?.id?.toString())
          );
          toggleLiked(
              auth?.user?.likes?.includes(props?.stationInfo?.id.toString())
          );
      }
  }, [props.stationInfo?.id]);

  const handleFavourite = async () => {
      const user = await sendFavourite(props.stationInfo.id);
      toggleFavourite(!isFavourite);
      setAuth({
          ...auth,
          user: user,
      });
  };

  const handleLike = async () => {
      const likes = await sendStationLike(props.stationInfo.id);
      toggleLiked(!isLiked);

      setAuth({
          ...auth,
          user: {
          ...auth.user,
          likes,
          },
      });
  };

  const handleShare = async () => {
    const shareOptions = {
      message: `${i18n.t('locationInfo.shareMessage')}` + " '" + props.stationInfo.name + "'" + `${i18n.t('locationInfo.shareMessage2')}`,
    }
    try {
      const shareResponse = await Share.share(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const customStyle = require('../../../utils/customStyleSheet');

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

  const ReportStation = (stationInfo) => {};




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
    if (
      props.stationInfo != null &&
      (props.routeActivate === null || props.routeActivate === undefined)
    ) {
      setStationInfoStyle(styles.locationInfoOpened);
      setModalButtonStyle(styles.locationModalButton);
      let temp = await getStationPollution(
        props?.stationInfo?.lat,
        props?.stationInfo?.lng
      );
      if (temp == null || temp == undefined) {
        setPollution(i18n.t("miscelaneus.loading"));
        setPollutionColor("#ffffff");
      } else {
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
      <View style={[customStyle.coolBlockTitleContainer,{flexDirection: 'row'}]}>
        <Text style={[customStyle.title, {textAlignVertical: 'center'}]}>
          {props?.stationInfo?.address}
        </Text>
        <CustomButton
          imageSrc={isFavourite
            ? require("../../../../assets/images/favourite.png")
            : require("../../../../assets/images/blank-favourite.png")
          }
          onPress={handleFavourite}
          customStyles={styles.favButtonContainer}
          imageStyle={{width: "70%", height: "70%"}}
        />
      </View>
      <View style={styles.locationInfo}>
        <GenericLocationInfo stationInfo={props?.stationInfo} />
      </View>
      
      {/* <View style={styles.botBarContent}>
        <Text style={styles.pollutionText(pollutionColor)}>
          {i18n.t("locationInfo.pollutionLevel")}: {pollution}
        </Text>
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
            updateAchievement(2);
          }}
          text={i18n.t("locationInfo.getThere")}
        />
      </View> */}
      <View style={styles.botBarContent}>
        <CustomButton
          imageSrc={isLiked
            ? require("../../../../assets/images/like.png")
            : require("../../../../assets/images/blank-like.png")
          }
          onPress={handleLike}
          customStyles={styles.favButtonContainer}
          imageStyle={{width: "70%", height: "70%"}}
        />
        <CustomButton
          imageSrc={require("../../../../assets/images/icons/flag.png")}
          onPress={() => setReportStationVisible(true)}
          customStyles={styles.favButtonContainer}
          imageStyle={{width: "70%", height: "70%"}}
        />
        <CustomButton
          imageSrc={ require("../../../../assets/images/direction.png") }
          onPress={handleLike}
          customStyles={styles.favButtonContainer}
          imageStyle={{width: "70%", height: "70%"}}
        />
        <CustomButton
          imageSrc={isLiked
            ? require("../../../../assets/images/like.png")
            : require("../../../../assets/images/blank-like.png")
          }
          onPress={handleShare}
          customStyles={styles.favButtonContainer}
          imageStyle={{width: "70%", height: "70%"}}
        />

      </View>
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
    height: "45%",
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
    borderWidth: 1,
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
  pollutionText: (pollutionColor) => ({
    backgroundColor: pollutionColor,
    color: "black",
    alignSelf: "center",
    padding: "2%",
    borderRadius: 10,
  }),
  favButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  favButtonImage: {
    
  },
});

export { LocationInfo };
