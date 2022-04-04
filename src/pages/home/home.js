import React,{useEffect, useState, useRef} from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { CustomMapView, FilterMap, LocationInfo } from './homeComponents/';
import useAuth from '../../hooks/useAuth';


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

  const [search, setSearch] = useState('');

  const onChangeText = (text) => {  
    setSearch(text);  
  }

  const [currentFilter, setCurrentFilter] = useState("");

  const ChangeFilter = (filter) => {
    setCurrentFilter(filter);
    //console.log(filter);
    CloseStationInfo();
  }

  const [wantRoute, setWantRoute] = useState(null);
  const [currentStationInfo, setStationInfo] = useState(null);

  function OpenStationInfo (station) {
    setStationInfo(station);
    
  }

  function CloseStationInfo () {
    setStationInfo(null);
    setWantRoute(false);
  }

  function ActivateRoute () {
    setWantRoute(true);
  }


  return (
    
    <View style={styles.container}>
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
              placeholder="Search:"
          />
      </View>
      <CustomMapView 
        //Cogemos elutimo por ahora, luego cogeremos el 0 tras purgar la BD
        color={auth?.user?.vehicleConfig[6].color}
        OpenStationInfo={OpenStationInfo}
        CloseStationInfo={CloseStationInfo}
        //require( '../../../assets/images/carTypes/carType_0.png')
        vehicleType= {vehicleImages[auth?.user?.vehicleConfig[6].vehicleType]}
        mapFilter={currentFilter}
        routeActivate={wantRoute}
        ActivateRoute={ActivateRoute}

      />

      <LocationInfo
        stationInfo={currentStationInfo}
        ActivateRoute={ActivateRoute}
      /> 

      <FilterMap
        onChangeFilter={ChangeFilter}
      />
      

    </View>
  );
  
}

const styles = StyleSheet.create({
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