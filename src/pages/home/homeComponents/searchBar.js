import React, { Component, useEffect, useState, useRef } from 'react';
import {Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import i18n from 'i18n-js';
import Autocomplete from 'react-native-autocomplete-input';
import {Divider} from "react-native-elements";

const SearchBar = ({shownChargePoints, handleOnSearch, routeActivate, searchType}) => {
    const [filteredStat, setFilteredStat] = useState([]);
    const [open, setOpen] = useState("none");
    const [text, setText] = useState(null);
    const [routeActive, setRouteActive] = useState(null);
    const findStation = (search) => {
        if (search) {
          const regex = new RegExp(`${search.trim()}`, 'i');
          setFilteredStat(
              shownChargePoints.filter((chargePoint) => chargePoint[1].name.search(regex) >= 0).map(chargePoint => chargePoint[1].name )
          );
        } else {
          setFilteredStat([]);
        }
      };

      useEffect(() =>routeActivate ? setRouteActive("none"): setRouteActive(null) , [routeActivate]);

      const separator = () => (<View style={{height:1, backgroundColor:"grey"}}></View>);

      const getStationType= (name) =>{
          let station = shownChargePoints.filter((chargePoint) => chargePoint[1].name == name);
          let vehicleType = station[0][1].objectType;
          return vehicleType;
      }

    return ( 
        <View style={styles.autocompleteContainer}>
            <Autocomplete
            onChangeText={(text) => {
                text != "" ? setOpen(null) : setOpen("none");
                findStation(text);
                setText(text);
            }}
            data={filteredStat}
            name="search"
            value={text}
            placeholder={`${i18n.t('home.searchBar')}`}
            containerStyle={[{display:routeActive}]}
            listContainerStyle={[styles.listContainer, {display:open}]} 
            inputContainerStyle={styles.searchBar}
            flatListProps={{
                keyExtractor: (item, idx) => item+idx,
                ItemSeparatorComponent:separator,
                renderItem:({item, index}) =>(
                <View style={styles.listItem}>
                    <TouchableOpacity onPress={() => {
                        //console.log(item); 
                        handleOnSearch(item);
                        setOpen("none");
                        setText(null);
                        }}
                    >
                       
                        <Text style={styles.text}>{item}</Text>
                        {getStationType(item) == "bikeStation" 
                         ? 
                            <Image
                                source={require('../../../../assets/images/icons/bike.png')}
                                style={styles.icon} 
                            />
                         : 
                            <Image
                                source={require('../../../../assets/images/icons/station.png')}
                                style={styles.icon} 
                            />
                         }
                    </TouchableOpacity>   
                </View>),
                
               
            
            }}
            />
         </View>

     );
}

const styles = StyleSheet.create({
    searchBar: {
      width: Dimensions.get('window').width - 70,
      paddingLeft: 10,
    },
    autocompleteContainer: {
        flex: 1,
        left: 50,
        position: 'absolute',
        right: 0,
        top:-60,
        zIndex: 1,
        padding: 10,
    },
    listContainer:{
        backgroundColor:'#F5FCFF',
        zIndex:1,
        paddingTop:0,
        borderRadius: 20,
        paddingLeft: 10,
        height: Dimensions.get('window').height - 500,
        width: Dimensions.get('window').width - 70,

    },
    listItem:{

        paddingTop:5,
        paddingBottom:5,
    },
    icon: {
        position:"absolute",
        top:3,
        width: 16,
        height: 16
    },
    text:{
        paddingLeft: 20,
    }
     
   
})
 
export default SearchBar;