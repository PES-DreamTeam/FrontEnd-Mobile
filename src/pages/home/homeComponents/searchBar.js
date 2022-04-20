import React, { Component, useEffect, useState, useRef } from 'react';
import {Dimensions, StyleSheet, ActivityIndicator, View, TouchableOpacity, Text } from 'react-native';
import i18n from 'i18n-js';
import Autocomplete from 'react-native-autocomplete-input';

const SearchBar = ({shownChargePoints}) => {
    const [filteredStat, setFilteredStat] = useState([]);
    const [open, setOpen] = useState("none");
    const findStation = (search) => {
        // Method called every time when we change the value of the input
        if (search) {
          // Making a case insensitive regular expression
          const regex = new RegExp(`${search.trim()}`, 'i');
          // Setting the filtered film array according the query
          setFilteredStat(
              shownChargePoints.filter((chargePoint) => chargePoint[1].name.search(regex) >= 0).map(chargePoint => chargePoint[1].name )
          );
        } else {
          // If the query is null then return blank
          setFilteredStat([]);
        }
      };


    return ( 
        <View style={styles.autocompleteContainer}>
            <Autocomplete
            onChangeText={(text) => {
                text != "" ? setOpen(null) : setOpen("none")
                findStation(text)
            }}
            data={filteredStat}
            name="search"
            placeholder={`${i18n.t('home.searchBar')}`}
            listContainerStyle={[styles.listContainer, {display:open}]}
            flatListProps={{
                renderItem:({item}) => <TouchableOpacity><Text>{item}</Text></TouchableOpacity>,
            }}
            />
         </View>

     );
}

const styles = StyleSheet.create({
    searchBar: {
      width: Dimensions.get('window').width - 50,
      borderRadius: 50,
      paddingLeft: 10,
      borderColor: 'gray',
      borderWidth: 10,
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

        paddingTop:10,
        height: Dimensions.get('window').height - 500,
    }
     
   
})
 
export default SearchBar;