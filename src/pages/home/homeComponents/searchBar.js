import React, { Component, useEffect, useState, useRef } from 'react';
import {Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import i18n from 'i18n-js';
import Autocomplete from 'react-native-autocomplete-input';
import {Divider} from "react-native-elements";

const SearchBar = ({shownChargePoints, handleOnSearch, routeActivate, openSearchBar, setOpenSearchBar, searchType}) => {
    const [filteredStat, setFilteredStat] = useState([]);
    
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

      useEffect(() =>routeActivate ? setRouteActive("none") : setRouteActive(null), [routeActivate]);
      useEffect(() => {
            setOpenSearchBar("none");
          setText("");
      }, [shownChargePoints]);


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
                text != "" ? setOpenSearchBar(null) : setOpenSearchBar("none");
                findStation(text);
                setText(text);
            }}
            data={filteredStat}
            name="search"
            value={text}
            placeholder={`${i18n.t('home.searchBar')}`}
            inputContainerStyle={styles.searchBar}
            listContainerStyle={[styles.listContainer, {display:openSearchBar}]} 
            
            flatListProps={{
                keyExtractor: (item, idx) => item+idx,
                ItemSeparatorComponent:separator,
                renderItem:({item, index}) =>(
                <View>
                    <TouchableOpacity 
                    style={styles.listItem}
                    onPress={() => {
                        //console.log(item); 
                        handleOnSearch(item);
                        setOpenSearchBar("none");
                        setText(null);
                        }}
                    >
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
                         <Text style={styles.text}>{item}</Text>
                    </TouchableOpacity>   
                </View>),
            }}
            />
         </View>

     );
}

const styles = StyleSheet.create({
    searchBar: {
      width: "100%",
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      backfaceVisibility: "hidden",
      padding: 10,
      borderWidth: 1,
        borderRadius: 50,
        borderColor: "black",
    },
    autocompleteContainer: {
        flex: 1,
        width: "90%",
        height: "100%",
        alignSelf: "center",
        justifyContent: "center",
        
    },
    listContainer:{
        backgroundColor:'#F5FCFF',
        marginTop: 10,
        width: "100%",
        height: 400,
        alignSelf: "center",
        justifyContent: "center",

    },
    listItem:{
        paddingTop:5,
        flexDirection: "row",
        width: "100%",
        height: 50,
    },
    icon: {
        width: 16,
        height: 16,
        marginLeft: 5,
    },
    text:{
        paddingLeft: 5,
    }
     
   
})
 
export default SearchBar;