import React, { useEffect, useState } from 'react';
import useUserSettings from '../../../hooks/useUserSettings';
import { StyleSheet, Pressable, View, Image, Text } from 'react-native';
import i18n from 'i18n-js';

const FilterMap = ({onChangeFilter, ChangeRoutingInfo, ActivateRoute, filterVehicle, filterBike, filterHighlight, filterFavs }) => {
    useUserSettings();

    

    return (
        <View style ={styles.filterContent}> 
            {/* <Pressable 
                style ={styles.filterButton}
                onPress={() => {
                    onChangeFilter("");
                    ChangeRoutingInfo(null);
                    ActivateRoute(null);
                }}
                >
                    <Image
                        source={require('../../../../assets/images/icons/default.png')}
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.map")}</Text>
            </Pressable> */}
            <Pressable 
                style ={[styles.filterButton, 
                     filterVehicle? styles.selectedBottomButon : styles.unselectedBottomButon]}
                onPress={() =>{
                 onChangeFilter("vehicleStation");
                 ChangeRoutingInfo(null);
                 ActivateRoute(null);
                }}
                >
                    <Image
                        source={require('../../../../assets/images/icons/station.png')}
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.vehicle")}</Text>
            </Pressable>
            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1},
                    filterBike? styles.selectedBottomButon : styles.unselectedBottomButon]}
                onPress={() =>{
                    onChangeFilter("bikeStation")
                    ChangeRoutingInfo(null);
                    ActivateRoute(null);
                } }
            >
                <Image
                        source={require('../../../../assets/images/icons/bike.png')}
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.bike")}</Text>
            </Pressable>
            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1},
                    filterHighlight? styles.selectedBottomButon : styles.unselectedBottomButon]}
                onPress={() => {
                    onChangeFilter("highlight")
                    ChangeRoutingInfo(null);
                    ActivateRoute(null);
                } }
                >
                    <Image
                        source={require('../../../../assets/images/icons/alert.png')}
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.highlight")}</Text>
            </Pressable>

            <Pressable 
                style ={[styles.filterButton, {borderLeftWidth: 1},
                    filterFavs? styles.selectedBottomButon : styles.unselectedBottomButon]}
                onPress={() => {
                    onChangeFilter("favs")
                    ChangeRoutingInfo(null);
                    ActivateRoute(null);
                } }
                >
                    <Image
                        source={require('../../../../assets/images/icons/star.png')} 
                        style={styles.icon}
                    />
                <Text>{i18n.t("home.bottomBar.favs")}</Text>
            </Pressable>
          
        </View>
    );
}

const styles = StyleSheet.create({
    
    selectedBottomButon: {
        backgroundColor: 'grey',
    },
    unselectedBottomButon: {
        backgroundColor: 'white',
    },
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