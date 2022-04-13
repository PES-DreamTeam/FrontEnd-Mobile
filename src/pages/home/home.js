import React,{useEffect, useState, useRef} from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { CustomMapView, FilterMap, LocationInfo } from './homeComponents/';
import useAuth from '../../hooks/useAuth';
import i18n from 'i18n-js';
import { RoutesInfo } from './homeComponents/RoutesInfo';


export default function HomeScreen({ navigation }) {

  var vehicleImages = [
    require( '../../../assets/images/carTypes/icons/carType_0.png'),
    require( '../../../assets/images/carTypes/icons/carType_1.png'),
    require( '../../../assets/images/carTypes/icons/carType_2.png'),
    require( '../../../assets/images/carTypes/icons/carType_3.png'),
    require( '../../../assets/images/carTypes/icons/carType_4.png'),
    require( '../../../assets/images/carTypes/icons/carType_5.png'),
]

  const { auth } = useAuth();

  const [user,setUser] = useState(auth?.user);
  const [search, setSearch] = useState('');
  const [currentFilter, setCurrentFilter] = useState("");
  const [wantRoute, setWantRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [currentStationInfo, setStationInfo] = useState(null);

  useEffect(() => {setUser(auth.user)},[auth]);

  const{ vehicleConfig } = user;

  const onChangeText = (text) => {  
    setSearch(text);  
  }

  const ChangeFilter = (filter) => {
    setCurrentFilter(filter);
    CloseStationInfo();
  }

  const OpenStationInfo = (station) => {
    setStationInfo(station);
  }

  const CloseStationInfo = () => {
    setStationInfo(null);
  }

  const ActivateRoute = (coord_estacion) => {
    setWantRoute(coord_estacion);
  }

  const changeRouteInfo = (newRouteInfo) => {
    setRouteInfo(newRouteInfo);
  }

  return (
    
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topBar}>
          <Pressable style={styles.topBarMenuButton} onPress={()=>navigation.toggleDrawer()}>
            <Image
              source={require('../../../assets/images/desplegable.png')}
            />
          </Pressable>
          <TextInput
                onChangeText={(text) => onChangeText(text)}
                value={search}
                style={styles.searchBar}
                name="search"
                placeholder={`${i18n.t('home.searchBar')}`}
            />
        </View>
        
        <RoutesInfo 
          routeActivate={wantRoute}
          ActivateRoute={ActivateRoute}
          routingInfo={routeInfo}
        />
      </View>
      <CustomMapView 
        color={vehicleConfig[0]?.color ?? '#000000'}
        OpenStationInfo={OpenStationInfo}
        CloseStationInfo={CloseStationInfo}
        vehicleType= {vehicleImages[vehicleConfig[0]?.vehicleType ?? 0]}
        mapFilter={currentFilter}
        routeActivate={wantRoute}
        ActivateRoute={ActivateRoute}
        onChangeFilter={ChangeFilter}
        ChangeRoutingInfo={changeRouteInfo}
      />

      <LocationInfo
        stationInfo={currentStationInfo}
        ActivateRoute={ActivateRoute}
        onChangeFilter={ChangeFilter}
      /> 
      

      <FilterMap
        onChangeFilter={ChangeFilter}
        ChangeRoutingInfo={changeRouteInfo}
        ActivateRoute={ActivateRoute}
      />

    </View>
  );
  
}

const styles = StyleSheet.create({
  top: {
    marginTop: 20,
    width: '100%',
    textAlign: 'left',
    alignItems: 'center'
  },
  topBar: {
    marginTop: 20,
    height: 60,
    width: '100%',
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center'
  },
  topBarMenuButton: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    justifyContent: "flex-end",
  },
  searchBar: {
    width: Dimensions.get('window').width - 160,
    borderRadius: 60,
    paddingLeft: 10,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  }
});

export {HomeScreen};