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
import SearchBar from './homeComponents/searchBar';

export default function HomeScreen({ navigation }) {
  var vehicleImages = [
    require("../../../assets/images/carTypes/icons/carType_0.png"),
    require("../../../assets/images/carTypes/icons/carType_1.png"),
    require("../../../assets/images/carTypes/icons/carType_2.png"),
    require("../../../assets/images/carTypes/icons/carType_3.png"),
    require("../../../assets/images/carTypes/icons/carType_4.png"),
    require("../../../assets/images/carTypes/icons/carType_5.png"),
    require("../../../assets/images/carTypes/icons/carType_6.png"),
    require("../../../assets/images/carTypes/icons/carType_7.png"),
    require("../../../assets/images/carTypes/icons/carType_8.png"),
  ];

  const [openSearchBar, setOpenSearchBar] = useState("none");

  const { auth } = useAuth();
  const { ChangeMapFilter, mapFilter, wantRoute, setWantRoute, shownChargePoints,
    routeInfo, setRouteInfo, currentStationInfo, setStationInfo, setSearchedPoint } = useMap();

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

  const handleOnSearch = (nameStation) =>{
    let stationSearched = shownChargePoints.filter(current => current[1].name  === nameStation);    
    let statlocation = {latitude:stationSearched[0][1].lat, longitude:stationSearched[0][1].lng, latitudeDelta:0.01, longitudeDelta:0.01}
    setSearchedPoint(stationSearched[0][1].id);
    OpenStationInfo(stationSearched[0][1]);
  }

  return (
    <View style={styles.container}>
      <View style={openSearchBar? styles.top : styles.topSearch}>
        <View style={styles.topBar}>
          <View style={styles.topBarMenuButtonContainer}>
            <Pressable
              style={styles.topBarMenuButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Image source={require("../../../assets/images/desplegable.png")} />
            </Pressable>
          </View>
          <View style={styles.searchBarContainer}>
            <SearchBar 
              shownChargePoints={shownChargePoints}
              handleOnSearch={handleOnSearch}
              routeActivate={wantRoute}
              openSearchBar={openSearchBar}
              setOpenSearchBar={setOpenSearchBar}
            />
          </View>
        </View>
        <View style={styles.routesInfoContainer}>
          <RoutesInfo
            routeActivate={wantRoute}
            ActivateRoute={ActivateRoute}
            routingInfo={routeInfo}
          />
        </View>
      </View>
      {
      <CustomMapView
        //ref={mapViewRef}
        color={vehicleConfig[currentVehicle]?.color ?? "#000000"}
        OpenStationInfo={OpenStationInfo}
        CloseStationInfo={CloseStationInfo}
        vehicleType={
          vehicleImages[vehicleConfig[currentVehicle]?.vehicleType ?? 8]
        }
        mapFilter={mapFilter}
        routeActivate={wantRoute}
        ActivateRoute={ActivateRoute}
        onChangeFilter={ChangeMapFilter}
        ChangeRoutingInfo={changeRouteInfo}
      />
      }

      <LocationInfo
        stationInfo={openSearchBar? currentStationInfo : null}
        routeActivate={wantRoute}
        ActivateRoute={ActivateRoute}
        onChangeFilter={ChangeMapFilter}
      />

      
      {/* <FilterMap
        ChangeRoutingInfo={changeRouteInfo}
        ActivateRoute={ActivateRoute}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: 20,
    width: "100%",
    minHeight: 80,
    height: "10%",
    textAlign: "left",
  },
  topSearch: {
    marginTop: 20,
    minHeight: 150,
    width: "100%",
    height: "50%",
    textAlign: "left",
  },
  topBar: {
    marginTop: 20,
    height: "100%",
    width: "100%",
    textAlign: "left",
    flexDirection: "row",
  },
  topBarMenuButton: {
    width: "100%",
    height: "100%",
    /*     alignItems: "center", */
    alignItems: "center",
  },
  searchBarContainer: {
    width: "85%",
    height: "100%",
    justifyContent: "center",
  },
  routesInfoContainer: {
    width: "100%",
    
  },
  topBarMenuButtonContainer: {
    width: "15%",
    height: "100%",
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
