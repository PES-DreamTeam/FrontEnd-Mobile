import i18n from "i18n-js";
import React, {
  Component,
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { StyleSheet, Pressable, View, Image, Text } from "react-native";
import useAuth from "../../../hooks/useAuth";

const GetTotalSockets = (stationInfo, vehicleType) => {
  let sockets = stationInfo?.stationInfo?.data.sockets;
  let total = 0;
  for (let i = 0; i < sockets.length; ++i) {
    if (sockets[i].vehicle_type == vehicleType) {
      total++;
    }
  }
  return total;
};

const GetTotalSocketsCar = (stationInfo) => {
  return GetTotalSockets(stationInfo, 0);
};

const GetTotalSocketsMoto = (stationInfo) => {
  return GetTotalSockets(stationInfo, 1);
};

const GetAvailableSockets = (stationInfo, vehicleType) => {
  let sockets = stationInfo?.stationInfo?.data.sockets;
  let available = 0;
  for (let i = 0; i < sockets.length; ++i) {
    if (
      sockets[i].vehicle_type == vehicleType &&
      sockets[i].socket_state == 0
    ) {
      available++;
    }
  }
  return available;
};

const GetAvailableSocketsCar = (stationInfo) => {
  return GetAvailableSockets(stationInfo, 0);
};

const GetAvailableSocketsMoto = (stationInfo) => {
  return GetAvailableSockets(stationInfo, 1);
};

const GetAllSocketTypes = (stationInfo, vehicleType) => {
  let sockets = stationInfo?.stationInfo?.data.sockets;
  let types = [];
  let found = false;
  for (let i = 0; i < sockets.length; ++i) {
    let temp = sockets[i].socket_type.split(",");
    if (vehicleType == sockets[i].vehicle_type) {
      for (let j = 0; j < temp.length; ++j) {
        found = false;

        for (let k = 0; k < types.length; ++k) {
          if (types[k] == temp[j]) {
            found = true;
            break;
          }
        }
        if (!found) {
          types.push(temp[j]);
        }
        found = false;
      }
    }
  }
  return types;
};

const GetAllSocketTypesCar = (stationInfo) => {
  return GetAllSocketTypes(stationInfo, 0);
};

const GetAllSocketTypesMoto = (stationInfo) => {
  return GetAllSocketTypes(stationInfo, 1);
};

const ChargeStationIcon = (chargerType) => {};

const ChargeStationInfo = (stationInfo) => {
  const { auth, updateUser } = useAuth();
  const [isFavourite, toggleFavourite] = useState(
    auth.user?.favourite_stations?.includes(stationInfo?.stationInfo?.id)
  );

  const handleFavourite = () => {
    toggleFavourite(!isFavourite);
    if (!isFavourite) {
      /* auth.user.favourite_stations = auth.user.favourite_stations.filter(id => id != stationInfo?.stationInfo?.id); */
    } else {
      /* auth.user.favourite_stations.push(stationInfo?.stationInfo?.id); */
    }
    /*     updateUser(auth.user);
     */
  };

  var vehicleImages = [
    require("../../../../assets/images/chargerTypes/chargerType_1.png"),
    require("../../../../assets/images/chargerTypes/chargerType_2.png"),
    require("../../../../assets/images/chargerTypes/chargerType_3.png"),
    require("../../../../assets/images/chargerTypes/chargerType_4.png"),
  ];
  //console.log(GetAllSocketTypes(stationInfo));
  return (
    <View style={styles.chargingStationContent}>
      <View style={styles.chargersDisplay}>
        {GetTotalSocketsCar(stationInfo) > 0 ? (
          <View style={styles.socketsTypesContent}>
              <View style={styles.chargerAvailability}>
            <Image
              source={require("../../../../assets/images/icons/carIcon.png")}
              style={styles.vehicleIcon}
              />
            <Text style={styles.availabilityText}>
              {GetAvailableSocketsCar(stationInfo)}/
              {GetTotalSocketsCar(stationInfo)}
            </Text>
              </View>
            <View style={styles.socketsList}>
              {GetAllSocketTypesCar(stationInfo).map((socket, index) => (
                <Image
                  source={vehicleImages[socket - 1]}
                  style={styles.socketImage}
                  key={index}
                />
              ))}
            </View>
          </View>
        ) : (
          <View />
        )}
        {GetTotalSocketsMoto(stationInfo) > 0 ? (
          <View style={styles.socketsTypesContent}>
                <View style={styles.chargerAvailability}>
            <Image
              source={require("../../../../assets/images/icons/motoIcon.png")}
              style={styles.vehicleIcon}
            />
            <Text style={styles.availabilityText}>
              {GetAvailableSocketsMoto(stationInfo)}/
              {GetTotalSocketsMoto(stationInfo)}
            </Text>
                </View>
            <View style={styles.socketsList}>
              {GetAllSocketTypesMoto(stationInfo).map((socket) => (
                <Image
                  source={vehicleImages[socket - 1]}
                  style={styles.socketImage}
                />
              ))}
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
      <Pressable onPressOut={handleFavourite} style={styles.favouriteButton}>
        <Image
          source={
            isFavourite
              ? require("../../../../assets/images/blank-favourite.png")
              : require("../../../../assets/images/favourite.png")
          }
          style={styles.heartIcon}
        ></Image>
      </Pressable>
    </View>
  );
};

const BikeStationInfo = (stationInfo) => {
  const [isBikeFavourite, toggleBikeFavourite] = useState(false);

  const handleBikeFavourite = () => {
    toggleBikeFavourite(!isBikeFavourite);
    if (!isBikeFavourite) {
      /* auth.user.favourite_stations = auth.user.favourite_stations.filter(id => id != stationInfo?.stationInfo?.id); */
    } else {
      /* auth.user.favourite_stations.push(stationInfo?.stationInfo?.id); */
    }
    /*     updateUser(auth.user); */
  };

  console.log(stationInfo);
  return (
    <View style={styles.bikeStationContent}>
      <Pressable
        onPressOut={handleBikeFavourite}
        style={styles.favouriteButton}
      >
        <Image
          source={
            isBikeFavourite
              ? require("../../../../assets/images/blank-favourite.png")
              : require("../../../../assets/images/favourite.png")
          }
          style={styles.heartIcon}
        ></Image>
      </Pressable>
      <View style={styles.bikeContent}>
        <View style={styles.bikeSlotType}>
          <Image
            source={require("../../../../assets/images/icons/mechanical.png")}
            style={styles.vehicleIcon}
          />
          <Text style={styles.stationBikeText}>
            {stationInfo.stationInfo.data.sockets[0].available_mechanical}{" "}
            {i18n.t("locationInfo.mechanical")}
          </Text>
        </View>
        <View style={styles.bikeSlotType}>
          <Image
            source={require("../../../../assets/images/icons/electrical.png")}
            style={styles.vehicleIcon}
          />
          <Text style={styles.stationBikeText}>
            {stationInfo.stationInfo.data.sockets[0].available_electrical}{" "}
            {i18n.t("locationInfo.electrical")}
          </Text>
        </View>
        <View style={styles.bikeSlotType}>
          <Image
            source={require("../../../../assets/images/icons/parking.png")}
            style={styles.vehicleIcon}
          />
          <Text style={styles.stationBikeText}>
            {stationInfo.stationInfo.data.sockets[0].available_sockets}{" "}
            {i18n.t("locationInfo.parking")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const HighlightInfo = (stationInfo) => {
  return <View style={styles.highlightContent}></View>;
};

const GenericLocationInfo = (stationInfo) => {
  switch (stationInfo?.stationInfo?.objectType) {
    case "vehicleStation":
      return <ChargeStationInfo stationInfo={stationInfo.stationInfo} />;
    case "bikeStation":
      return <BikeStationInfo stationInfo={stationInfo.stationInfo} />;
    default:
      return <HighlightInfo stationInfo={stationInfo.stationInfo} />;
  }
};

const LocationInfo = (stationInfo) => {
  const [stationInfoStyle, setStationInfoStyle] = useState(
    styles.locationInfoClosed
  );
  // console.log(stationInfo)
  useEffect(() => {
    if (stationInfo.stationInfo != null) {
      setStationInfoStyle(styles.locationInfoOpened);
    } else {
      setStationInfoStyle(styles.locationInfoClosed);
    }
  }, [stationInfo]);
  return (
    <View style={stationInfoStyle}>
      <View style={styles.locationAddressContent}>
        <Text style={{ color: "#1D69A6" }}>
          {stationInfo?.stationInfo?.address}
        </Text>
      </View>
      <GenericLocationInfo stationInfo={stationInfo.stationInfo} />
      <View style={styles.goThereContent}>
        <Pressable
          style={styles.goThereButton}
          onPress={() => {
            stationInfo.ActivateRoute({
              latitude: stationInfo?.stationInfo?.lat,
              longitude: stationInfo?.stationInfo?.lng,
              id: stationInfo?.stationInfo?.id,
            });
            stationInfo.onChangeFilter("singleCharge");
          }}
        >
          <Text style={styles.buttonText}>
            {" "}
            {i18n.t("locationInfo.getThere")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

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
  chargingStationContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "100%",
    marginTop: "1%",
  },
  chargersDisplay: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
  },
    chargerAvailability: {
    display: "flex",
    flexDirection: "row",
    },
  bikeStationContent: {
    height: "65%",
    width: "100%",
    alignItems: "center",
  },
  bikeSlotType: {
    alignItems: "center",
  },
  highlightContent: {
    height: "65%",
    width: "100%",
  },
  availabilityContent: {
    width: "100%",
    marginTop: 10,
  },
  socketsTypesContent: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: "3%",
  },
  bikeContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  stationBikeText: {
    marginTop: 10,
  },
  socketsList: {
    height: 50,
    flexDirection: "row",
  },
  vehicleIcon: {
    height: 50,
    width: 50,
    marginTop: 10,
    marginLeft: 5,
  },
  availabilityText: {
    marginTop: "5%"
},
  favouriteButton: {
    marginLeft: "auto",
  },
  heartIcon: {
    height: 40,
    width: 40,
  },
  socketImage: {
    height: 50,
    width: 47,
    marginLeft: 5,
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
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export { LocationInfo };
