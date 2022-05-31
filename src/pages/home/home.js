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
import useAchievements from "../../hooks/useAchievements";
import i18n from "i18n-js";
import { RoutesInfo } from "./homeComponents/RoutesInfo";
import  useMap  from "../../hooks/useMap";
import SearchBar from './homeComponents/searchBar';
import AutonomyModal from "./homeComponents/autonomyModal";

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

  const customStyle = require("../../utils/customStyleSheet");

  const [openSearchBar, setOpenSearchBar] = useState("none");

  const { auth } = useAuth();
  const { ChangeMapFilter, mapFilter, wantRoute, setWantRoute, shownChargePoints,
    routeInfo, setRouteInfo, currentStationInfo, setStationInfo, setSearchedPoint, isLoading, loadMapAsync } = useMap();

  const [user, setUser] = useState(auth?.user);
  const [search, setSearch] = useState("");
  const { updateAchievement } = useAchievements();

  var [tempRouteInfo, setTempRouteInfo] = useState();

  const [autonomyModalVisible, setAutonomyModalVisible] = useState(false);

  const ResetState = () => {
    setStationInfo(null);
    setWantRoute(null);
    setSearchedPoint(null);
    setOpenSearchBar("none");
    setTempRouteInfo(null);
    ActivateRoute(null);
    setRouteInfo(null);
    ChangeMapFilter((mapFilter));
  }


  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    console.log("HomeScreen: load map async");
    ResetState();
    loadMapAsync();

  }, []);

  const { vehicleConfig, currentVehicle } = user;

  const deleteSingle = (temp) => {
    let index = temp.indexOf("singleCharge");
    if (index !== -1) {
      temp.splice(index, 1);
      return temp;
    }
  };

  const OpenStationInfo = (station) => {
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

  const handleOnSearch = async (nameStation) =>{
    await updateAchievement(3);
    let stationSearched = shownChargePoints.filter(current => current[1].name  === nameStation);    
    let statlocation = {latitude:stationSearched[0][1].lat, longitude:stationSearched[0][1].lng, latitudeDelta:0.01, longitudeDelta:0.01}
    setSearchedPoint(stationSearched[0][1].id);
    OpenStationInfo(stationSearched[0][1]);
  }

  const BeginSearch = (info) => {
    if(info != 'none' && wantRoute != null){
      ActivateRoute(null);
      ChangeMapFilter((mapFilter));
      changeRouteInfo(null);
    }
    setOpenSearchBar(info)
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
              <Image style={styles.menuImage} source={require("../../../assets/images/desplegable.png")} />
            </Pressable>
          </View>
          <View style={styles.searchBarContainer}>
            <SearchBar 
              shownChargePoints={shownChargePoints}
              handleOnSearch={handleOnSearch}
              routeActivate={wantRoute}
              openSearchBar={openSearchBar}
              setOpenSearchBar={BeginSearch}
            />            
          </View>          
        </View>        
      </View>


      <CustomMapView
        //ref={mapViewRef}
        color={vehicleConfig[currentVehicle]?.color ?? "black"}
        OpenStationInfo={OpenStationInfo}
        CloseStationInfo={CloseStationInfo}
        vehicleType={
          vehicleConfig[currentVehicle]?.vehicleType ?? 8
        }
        mapFilter={mapFilter}
        routeActivate={wantRoute}
        ActivateRoute={ActivateRoute}
        onChangeFilter={ChangeMapFilter}
        ChangeRoutingInfo={changeRouteInfo}
        stationInfoOpened={currentStationInfo!==null}
        isLoading={isLoading}
        isSearching={!openSearchBar}
      />
      {
        routeInfo != null ?
        <RoutesInfo
        routeActivate={wantRoute}
        ActivateRoute={ActivateRoute}
        routingInfo={routeInfo}
        /> : null
      }
      { openSearchBar && currentStationInfo != null && wantRoute == null ?
      <LocationInfo
        stationInfo={openSearchBar? currentStationInfo : null}
        routeActivate={wantRoute}
        ActivateRoute={(info) => {
          if(!isLoading) {
            setTempRouteInfo(JSON.parse(JSON.stringify(info)));
            setAutonomyModalVisible(true);
          }
        }}
        onChangeFilter={ChangeMapFilter}
        /> : null}


      <AutonomyModal
        isVisible={autonomyModalVisible}
        handleAccept={(autonomy) => {
          if(!isLoading) {
            //pasar el valor de autonomia a la configuracion del vehiculo
            tempRouteInfo.autonomy = autonomy;
            setTempRouteInfo({...tempRouteInfo, transport: 'DRIVING', autonomy: autonomy});
            ActivateRoute({...tempRouteInfo, transport: 'DRIVING', autonomy: autonomy});
            setAutonomyModalVisible(false);
          }
        }}
        handleCancel={() => {
          if(!isLoading) {
            setTempRouteInfo({...tempRouteInfo, autonomy: 10000});
            ActivateRoute({...tempRouteInfo, autonomy: 10000});
            setAutonomyModalVisible(false);
          }
        }}
      />
      {
        (currentStationInfo !== null || wantRoute != null) && openSearchBar ?
      <View style={styles.bottomBackground}/> : null
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: '15%',
    backgroundColor: '#fff',
    zIndex: 2,
  },
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
  menuImage : {
    width: "40%",
    height: undefined,
    aspectRatio: 1,
    marginTop: 10,
  },
  filters: {
    position: "absolute",
    bottom: 0,
    left: 0,
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
    backgroundColor: "#f3edff",
    alignItems: "flex-start",
    justifyContent: "center",
    justifyContent: "flex-end",
  },
  searchBar: {
    width: Dimensions.get("window").width - 160,
    borderRadius: 60,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { HomeScreen };
