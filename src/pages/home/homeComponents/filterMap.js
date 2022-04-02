import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, Pressable, View, Image, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';

const FilterMap = ({onChangeFilter}) => {

    return (
        <View style ={styles.filterContent}> 
            <Pressable 
                style ={styles.filterButton}
                onPress={() => onChangeFilter("")}
                >
                <Text>Map</Text>
            </Pressable>
            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1}]}
                onPress={() => onChangeFilter("vehicleStation")}
                >
                <Text>Vehicle</Text>
            </Pressable>
            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1}]}
                onPress={() => onChangeFilter("bikeStation")}
            >
                <Text>Bike</Text>
            </Pressable>
            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1}]}
                onPress={() => onChangeFilter("highlight")}
                >
                <Text>Highlight</Text>
            </Pressable>
          
        </View>
    );
}

const styles = StyleSheet.create({
    
    filterContent: {
        width: '100%',
        height: 60,
        textAlign: 'left',
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    filterButton: {
        borderColor: 'grey',
        flex: 1,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    
})

export { FilterMap };