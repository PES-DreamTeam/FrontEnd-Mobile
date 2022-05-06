import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import { CustomMapView, FilterMap, LocationInfo } from "./homeComponents/";
import useAuth from "../../hooks/useAuth";
import i18n from "i18n-js";
import { RoutesInfo } from "./homeComponents/RoutesInfo";
import  useMap  from "../../hooks/useMap";

export default function HomeScreen({ navigation }) {
  var vehicleImages = [
    require("../../../assets/images/carTypes/icons/carType_0.png"),
    require("../../../assets/images/carTypes/icons/carType_1.png"),
    require("../../../assets/images/carTypes/icons/carType_2.png"),
    require("../../../assets/images/carTypes/icons/carType_3.png"),
    require("../../../assets/images/carTypes/icons/carType_4.png"),
    require("../../../assets/images/carTypes/icons/carType_8.png"),
  ];

 

  const { auth } = useAuth();
  const { ChangeMapFilter, mapFilter, wantRoute, setWantRoute, 
    routeInfo, setRouteInfo, currentStationInfo, setStationInfo, } = useMap();

  const [user, setUser] = useState(auth?.user);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  const { vehicleConfig, currentVehicle } = user;

  const deleteSingle = (temp) => {
    let index = temp.indexOf("singleCharge");
    if (index !== -1) {
      temp.splice(index, 1);
      return temp;
    }
  };

  const OpenStationInfo = (station) => {
    //console.log(station);
    setStationInfo(station);
  };

  const CloseStationInfo = () => {
    setStationInfo(null);
  };

  const ActivateRoute = (coord_estacion) => {
    setWantRoute(coord_estacion);
  };

  const changeRouteInfo = (newRouteInfo) => {
    setRouteInfo(newRouteInfo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.topBarMenuButton}
            onPress={() => navigation.toggleDrawer()}
          >
            <Image source={require("../../../assets/images/desplegable.png")} />
          </Pressable>
        </View>

        <RoutesInfo
          routeActivate={wantRoute}
          ActivateRoute={ActivateRoute}
          routingInfo={routeInfo}
        />
      </View>
      {
      <CustomMapView
        //ref={mapViewRef}
        color={vehicleConfig[currentVehicle ?? 8]?.color ?? "#000000"}
        OpenStationInfo={OpenStationInfo}
        CloseStationInfo={CloseStationInfo}
        vehicleType={
          vehicleImages[vehicleConfig[currentVehicle ?? 8]?.vehicleType ?? 8]
        }
        mapFilter={mapFilter}
        routeActivate={wantRoute}
        ActivateRoute={ActivateRoute}
        onChangeFilter={ChangeMapFilter}
        ChangeRoutingInfo={changeRouteInfo}
      />
      }

      <LocationInfo
        stationInfo={currentStationInfo}
        ActivateRoute={ActivateRoute}
        onChangeFilter={ChangeMapFilter}
      />

      <FilterMap
        ChangeRoutingInfo={changeRouteInfo}
        ActivateRoute={ActivateRoute}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: 20,
    width: "100%",
    textAlign: "left",
    alignItems: "center",
  },
  topBar: {
    marginTop: 20,
    height: 60,
    width: "100%",
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
  topBarMenuButton: {
    width: 80,
    height: "100%",
    justifyContent: "center",
    /*     alignItems: "center", */
    marginLeft: "3%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    justifyContent: "flex-end",
  },
  searchBar: {
    width: Dimensions.get("window").width - 160,
    borderRadius: 60,
    paddingLeft: 10,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});

export { HomeScreen };
