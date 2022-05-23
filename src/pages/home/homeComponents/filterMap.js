import React, { useEffect, useState } from 'react';
import useUserSettings from '../../../hooks/useUserSettings';
import { StyleSheet, Pressable, View, Image, Text } from 'react-native';
import i18n from 'i18n-js';
import useMap from '../../../hooks/useMap';
import CustomButton from '../../../utils/button';

const FilterMap = ({ChangeRoutingInfo, ActivateRoute}) => {
    useUserSettings();

    const {ChangeMapFilter, mapFilter} = useMap();

    return (
        <View style ={styles.filterContent}> 
            <CustomButton
                customStyles={[styles.filterButton, 
                    mapFilter?.includes("vehicleStation")? styles.selectedBottomButon : styles.unselectedBottomButon]}
                onPress={() =>{
                    ChangeMapFilter("vehicleStation");
                 ChangeRoutingInfo(null);
                 ActivateRoute(null);
                }}
                imageSrc={require('../../../../assets/images/icons/station.png')}
                imageStyle={{width: "60%", height: "60%"}}
            />
            <CustomButton
                customStyles={[styles.filterButton,
                    mapFilter?.includes("bikeStation")? styles.selectedBottomButon : styles.unselectedBottomButon]}
                onPress={() =>{
                    ChangeMapFilter("bikeStation")
                    ChangeRoutingInfo(null);
                    ActivateRoute(null);
                } }
                imageSrc={require('../../../../assets/images/icons/bike.png')}
                imageStyle={{width: "60%", height: "60%"}}
            />
            <CustomButton

                customStyles={[styles.filterButton,
                    mapFilter?.includes("highlights")? styles.selectedBottomButon : styles.unselectedBottomButon]}
                onPress={() => {
                    ChangeMapFilter("highlights")
                    ChangeRoutingInfo(null);
                    ActivateRoute(null);
                } }
                imageSrc={require('../../../../assets/images/icons/alert.png')}
                imageStyle={{width: "60%", height: "60%"}}
            />
            <CustomButton

                customStyles={[styles.filterButton, 
                    mapFilter?.includes("favs")? styles.selectedBottomButon : styles.unselectedBottomButon]}
                onPress={() => {
                    ChangeMapFilter("favs");
                    ChangeRoutingInfo(null);
                    ActivateRoute(null);
                } }
                imageSrc={require('../../../../assets/images/icons/star.png')}
                imageStyle={{width: "60%", height: "60%"}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    
    selectedBottomButon: {
        backgroundColor: '#c5a9fcdd',
    },
    unselectedBottomButon: {
        backgroundColor: '#ffffffaa',
    },
    filterContent: {
        width: 50,
        height: '35%',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',

        justifyContent: 'space-around',
        alignContent: 'center',
        bottom:"50%",
        right: 25,
        zIndex: 100,  

    }, 
    filterButton: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,

        maxHeight: 50,
    }, 
    icon: {
        width: 25,
        height: 24
    },
    
})

export { FilterMap };