import i18n from 'i18n-js';
import React, { Component, useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Pressable, View, Image, Text } from 'react-native';

const GetTotalSockets = (stationInfo, vehicleType) => {
    let sockets = stationInfo?.stationInfo?.data.sockets;
    let total = 0;
    for(let i = 0; i < sockets.length; ++i) {
        if(sockets[i].vehicle_type == vehicleType) {
            total++;
        }
    }
    return total;
}

const GetTotalSocketsCar = (stationInfo) => {
    return GetTotalSockets(stationInfo, 0);
}

const GetTotalSocketsMoto = (stationInfo) => {
    return GetTotalSockets(stationInfo, 1);
}

const GetAvailableSockets = (stationInfo, vehicleType) => {
    let sockets = stationInfo?.stationInfo?.data.sockets;
    let available = 0;
    for(let i = 0; i < sockets.length; ++i) {
        if(sockets[i].vehicle_type == vehicleType && sockets[i].socket_state == 0) {
            available++;
        }
    }
    return available;
}

const GetAvailableSocketsCar = (stationInfo) => {
    return GetAvailableSockets(stationInfo, 0);
}

const GetAvailableSocketsMoto = (stationInfo) => {
    return GetAvailableSockets(stationInfo, 1);
}

const GetAllSocketTypes = (stationInfo, vehicleType) => {
    let sockets = stationInfo?.stationInfo?.data.sockets;
    let types = [];
    let found = false;
    for(let i = 0; i < sockets.length; ++i) {
        let temp = sockets[i].socket_type.split(',');
        if(vehicleType == sockets[i].vehicle_type) {
            for(let j = 0; j < temp.length; ++j) {
                found = false;
                
                for(let k = 0; k < types.length; ++k) {
                    if(types[k] == temp[j]) {
                        found = true;
                        break;
                    }
                }
                if(!found) {
                    types.push(temp[j]);
                }
                found = false;
            }
        }
    }
    return types;
}

const GetAllSocketTypesCar = (stationInfo) => {
    return GetAllSocketTypes(stationInfo, 0);
}

const GetAllSocketTypesMoto = (stationInfo) => {
    return GetAllSocketTypes(stationInfo, 1);
}

const ChargeStationIcon = (chargerType) => {
    
}

const ChargeStationInfo = (stationInfo) => {

    var vehicleImages = [
        require( '../../../../assets/images/chargerTypes/chargerType_1.png'),
        require( '../../../../assets/images/chargerTypes/chargerType_2.png'),
        require( '../../../../assets/images/chargerTypes/chargerType_3.png'),
        require( '../../../../assets/images/chargerTypes/chargerType_4.png'),
    ]
    //console.log(GetAllSocketTypes(stationInfo));
    return (
        <View style ={styles.chargingStationContent}>
            {   GetTotalSocketsCar(stationInfo) > 0 ?          
            <View style = {styles.socketsTypesContent}>
                <Image 
                    source = {require( '../../../../assets/images/icons/carIcon.png')}
                    style={styles.vehicleIcon}
                />
                <Text>{GetAvailableSocketsCar(stationInfo)}/{GetTotalSocketsCar(stationInfo)}</Text>
                 <View style={styles.socketsList}>
                    {GetAllSocketTypesCar(stationInfo).map((socket, index) =>
                        <Image
                            source = {vehicleImages[socket-1]}
                            style={styles.socketImage}
                            key={index}
                        /> 
                    )} 
                </View>
                
            </View>: <View/>
            }
            {   GetTotalSocketsMoto(stationInfo) > 0 ?    
            <View style = {styles.socketsTypesContent}>
                <Image 
                    source = {require( '../../../../assets/images/icons/motoIcon.png')}
                    style={styles.vehicleIcon}
                />
                <Text>{GetAvailableSocketsMoto(stationInfo)}/{GetTotalSocketsMoto(stationInfo)}</Text>
                <View style={styles.socketsList}>
                    {GetAllSocketTypesMoto(stationInfo).map(socket =>
                        <Image
                            source = {vehicleImages[socket-1]}
                            style={styles.socketImage}
                        /> 
                    )} 
                </View>
            </View> : <View/>
            }
            
        </View>
    );
}

const BikeStationInfo = (stationInfo) => {
    console.log(stationInfo);
    return (
        <View style ={styles.bikeStationContent}> 
            <View style = {styles.bikeContent}>
                <View style = {styles.bikeSlotType}>
                    <Image 
                        source = {require( '../../../../assets/images/icons/mechanical.png')}
                        style={styles.vehicleIcon}
                    />
                    <Text style={styles.stationBikeText}>{stationInfo.stationInfo.data.sockets[0].available_mechanical} {i18n.t("locationInfo.mechanical")}</Text>
                </View>
                <View style = {styles.bikeSlotType}>
                    <Image
                        source = {require( '../../../../assets/images/icons/electrical.png')}
                        style={styles.vehicleIcon}
                    />
                    <Text style={styles.stationBikeText}>{stationInfo.stationInfo.data.sockets[0].available_electrical} {i18n.t("locationInfo.electrical")}</Text>
                </View>
                <View style = {styles.bikeSlotType}>
                    <Image 
                        source = {require( '../../../../assets/images/icons/parking.png')}
                        style={styles.vehicleIcon}
                    />
                    <Text style={styles.stationBikeText}>{stationInfo.stationInfo.data.sockets[0].available_sockets} {i18n.t("locationInfo.available")}</Text>
                </View>
            </View>
            
        </View>
    );
}

const HighlightInfo = (stationInfo) => {

    return (
        <View style ={styles.highlightContent}> 
            
            
        </View>
    );
}

const GenericLocationInfo = (stationInfo) => {
    switch(stationInfo?.stationInfo?.objectType) {
        case "vehicleStation":
            return <ChargeStationInfo stationInfo={stationInfo.stationInfo}/>;
        case "bikeStation":
            return <BikeStationInfo stationInfo={stationInfo.stationInfo}/>;
        default:
            return <HighlightInfo stationInfo={stationInfo.stationInfo}/>;
    }
}


const LocationInfo = (stationInfo) => {
    const [stationInfoStyle, setStationInfoStyle] = useState(styles.locationInfoClosed);
   // console.log(stationInfo)
    useEffect(()=>{
        if(stationInfo.stationInfo != null) {
            setStationInfoStyle(styles.locationInfoOpened);
        }
        else {
            setStationInfoStyle(styles.locationInfoClosed);
        }
    }, [stationInfo]);
    return (
        <View style ={stationInfoStyle}> 
            <View style={styles.locationAddressContent}>
                <Text style={{color:'#1D69A6'}}>{stationInfo?.stationInfo?.address}</Text>
            </View>
            <GenericLocationInfo stationInfo={stationInfo.stationInfo}/>
            <View style={styles.goThereContent}>
                <Pressable 
                style={styles.goThereButton}
                onPress={() => { 
                        stationInfo.ActivateRoute({
                            latitude:stationInfo?.stationInfo?.lat,
                            longitude:stationInfo?.stationInfo?.lng,
                            id:stationInfo?.stationInfo?.id})
                        stationInfo.onChangeFilter("singleCharge")
                    }}
                >
                    
                    <Text style={styles.buttonText}> {i18n.t("locationInfo.getThere")}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    locationInfoOpened: {
        height: "33%",
        width: "100%",
        padding: 5
    },
    locationInfoClosed: {
        height: 0,
        width: "100%",
    },
    locationAddressContent: {
        height:'15%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderEndColor: "grey"
    },
    chargingStationContent: {
        height: "65%",
        width: "100%",
    },
    bikeStationContent: {
        height: "65%",
        width: "100%",
        alignItems: 'center'
    },
    bikeSlotType: {
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlightContent:{
        height: "65%",
        width: "100%",
    },
    availabilityContent: {
        width: "100%",
        marginTop: 10,
    },
    socketsTypesContent: {
        width: "20%",
        flexDirection: 'row'
    },
    bikeContent: {
        flexDirection: 'row'
    },
    stationBikeText: {
        marginTop: 10
    },
    socketsList: {
        width: "80%",
        marginTop: 10,
        height: 50,
        marginLeft: 30,
        flexDirection: 'row',
    },
    vehicleIcon:  {
        height: 55,
        width: 55,
        marginTop: 10,
        marginLeft: 5
    },
    socketImage:  {
        height: 55,
        width: 53,
        marginLeft: 5
    },
    goThereContent: {
        height: "15%",
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    goThereButton: {
        backgroundColor: '#1D69A6',
        width: "33%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
    }
});

export {LocationInfo};