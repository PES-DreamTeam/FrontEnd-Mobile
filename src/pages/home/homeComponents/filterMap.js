import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, Pressable, View, Image, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import useChargePoints from '../../../hooks/useChargePoints';
import * as Location from 'expo-location';
import i18n from 'i18n-js';

const FilterMap = ({onChangeFilter}) => {

    return (
        <View style ={styles.filterContent}> 
            <Pressable 
                style ={styles.filterButton}
                onPress={() => onChangeFilter("")}
                >
                    <Image
                        source={require('../../../../assets/images/icons/default.png')}
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.map")}</Text>
            </Pressable>
            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1}]}
                onPress={() => onChangeFilter("vehicleStation")}
                >
                    <Image
                        source={require('../../../../assets/images/icons/station.png')}
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.vehicle")}</Text>
            </Pressable>
            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1}]}
                onPress={() => onChangeFilter("bikeStation")}
            >
                <Image
                        source={require('../../../../assets/images/icons/bike.png')}
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.bike")}</Text>
            </Pressable>
            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1}]}
                onPress={() => onChangeFilter("highlight")}
                >
                    <Image
                        source={require('../../../../assets/images/icons/star.png')}
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.highlight")}</Text>
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
    icon: {
        width: 25,
        height: 24
    },
    
})

export { FilterMap };