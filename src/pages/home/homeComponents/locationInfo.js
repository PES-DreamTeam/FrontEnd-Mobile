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

  const handleRoute = () => {
    props.ActivateRoute({
      latitude: props?.stationInfo?.lat,
      longitude: props?.stationInfo?.lng,
      id: props?.stationInfo?.id,
      objectType: props?.stationInfo?.objectType,
    });
    props.onChangeFilter("singleCharge");
    updateAchievement(2);
  };

  const handleShare = async () => {
    const message = `${i18n.t("locationInfo.shareMessage")}` + " '" + props.stationInfo.name + "'" + `${i18n.t("locationInfo.shareMessage2")}`
                  + "\n\n" +"https://maps.google.com/?q=" + props.stationInfo.lat + "," + props.stationInfo.lng;
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
        <View style={{width: '85%'}}>
          <Text style={[customStyle.title, {textAlignVertical: 'center'}]}>
            {props?.stationInfo?.address}
          </Text>
        </View>
        <View style={{width: '15%'}}>
          <CustomButton
            imageSrc={isFavourite
              ? require("../../../../assets/images/icons/favourite.png")
              : require("../../../../assets/images/icons/blank-favourite.png")
            }
            onPress={handleFavourite}
            customStyles={styles.favButtonContainer}
            imageStyle={{width: "70%", height: "70%"}}
            
          />
        </View>
      </View>
      <View style={styles.locationInfo}>
        <GenericLocationInfo stationInfo={props?.stationInfo} />
      </View>
      
      <View style={styles.getThereContent}>
        <View style={styles.pollutionContainer}>
          <View style={{width: '100%', height: '50%'}}>
            <Text style={[customStyle.normalText, styles.polutionTitle]}>
                {i18n.t("locationInfo.pollutionLevel")}
            </Text>
          </View>
          <View style={styles.pollutionRow}>
            <View style={[styles.circle, {backgroundColor: pollutionColor}]}>
              <View style={[styles.circle, {backgroundColor: '#ffffff70', borderWidth: 3, borderColor: 'transparent'}]}/>
            </View>
            <Text style={{marginLeft: 10}}>{pollution}</Text>
          </View>
        </View>
        <CustomButton
            imageSrc={ require("../../../../assets/images/icons/directions.png") }
            onPress={handleRoute}
            customStyles={styles.goThereButton}
            imageStyle={{height: 30, width: 30}}
            textStyle={customStyle.normalText}
            text={i18n.t("locationInfo.getThere")}
          />
      </View>

      <View style={styles.botBarContent}>
        <CustomButton
          imageSrc={isLiked
            ? require("../../../../assets/images/icons/like.png")
            : require("../../../../assets/images/icons/blank-like.png")
          }
          onPress={handleLike}
          customStyles={styles.likeButtonContainer}
          imageStyle={{height: 30, width: 30}}
          text={stationLikes + " " + i18n.t('locationInfo.likesNumber')}
          textStyle={customStyle.smallText}
        />
        <CustomButton
          imageSrc={require("../../../../assets/images/icons/flag.png")}
          onPress={() => setReportStationVisible(true)}
          customStyles={styles.likeButtonContainer}
          imageStyle={{height: 30, width: 30}}
          text={stationReports + " " + i18n.t('locationInfo.reportsNumber')}
          textStyle={customStyle.smallText}
        />
        
        <CustomButton
          imageSrc={ require("../../../../assets/images/icons/share.png") }
          onPress={handleShare}
          customStyles={styles.likeButtonContainer}
          imageStyle={{height: 30, width: 30}}
          textStyle={customStyle.smallText}
          text={i18n.t('locationInfo.shareStation')}
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
        stationType={props?.stationInfo?.objectType}
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
  plutionTitile: {
    marginBottom: 0,
    padding: 0,
    height: "50%",
    width: "100%",
    textAlign: "center",
  },
  pollutionRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: '100%',
    height: '50%',
    marginTop: 0,
  },
  highlightContent: {
    height: "65%",
    width: "100%",
  },
  locationInfo: {
    height: "50%",
    width: "100%",
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  botBarContent: {
    width: "95%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
  },
  goThereButton: {
    backgroundColor: "#f3edff",
    width: "48%",
    justifyContent: "space-evenly",

    flexDirection: "row-reverse",
    height: "100%",
  },
  polutionTitle: {
    textAlign: "center",
  },
  pollutionContainer: {
    width: "48%",
    height: "100%",
    padding: 0,
    borderWidth: 2,
    borderColor: "#eae4f6",
    borderRadius: 20,
  },
  getThereContent: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "45%",
    height: "100%",
  }),
  favButtonContainer: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "column-reverse",
  },
  likeButtonContainer: {
    height: 50,
    width: "24%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "column-reverse",
  },
  favButtonImage: {
    
  },
});

export { LocationInfo };
