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

      useEffect(() =>routeActivate ? setRouteActive("none") : setRouteActive(null), [routeActivate]);
      useEffect(() => {
          setOpen("none");
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
                text != "" ? setOpen(null) : setOpen("none");
                findStation(text);
                setText(text);
            }}
            data={filteredStat}
            name="search"
            value={text}
            placeholder={`${i18n.t('home.searchBar')}`}
            listContainerStyle={[styles.listContainer, {display:open}]} 
            inputContainerStyle={styles.searchBar}
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
                        setOpen("none");
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
      width: "90%",
      height: "100%",
      alignSelf: "center",
      justifyContent: "center",
      borderWidth: 0,
      marginBottom: 5,
    },
    autocompleteContainer: {
        width: "90%",
        height: "75%",
        zIndex: 15,
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "black",
    },
    listContainer:{
        backgroundColor:'#F5FCFF',
        zIndex:15,
        paddingTop:0,
        width: "100%",
        height: 200,
        alignSelf: "center",
        justifyContent: "center",

    },
    listItem:{
        zIndex:20,
        paddingTop:5,
        paddingBottom:5,
        flexDirection: "row",
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