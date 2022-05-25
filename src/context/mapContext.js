import React, { createContext, useEffect, useState } from 'react';
import useChargePoints from '../hooks/useChargePoints';
import useAuth from "../hooks/useAuth";
import * as Location from 'expo-location';


const MapContext = createContext({});

const MapContextProvider = ({ children }) => {

    const { auth } = useAuth();

    const { getChargePoints } = useChargePoints();

    const [userLocation,setUserLocation] = useState({
        latitude:41.3887900,
        longitude:2.1589900,
        latitudeDelta:0.01,
        longitudeDelta:0.01
    });
    const [isLoading, setIsLoading] = useState(false);
    const [shownChargePoints, setShown] = useState([]);
    const [searchedPoint, setSearchedPoint] = useState(null);
    const [searchType, setSearchType] = useState(null);

    const [wantRoute, setWantRoute] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [currentStationInfo, setStationInfo] = useState(null);

    const [mapFilter, setMapFilters] = useState(["vehicleStation"]);

    const setMapFilter = (filter) => {
        if(!isLoading) {
            setMapFilters(filter);
        }
    }

    const ReloadMapPoints = async () => {
        let pointsToShow = await getChargePoints(mapFilter, auth?.user?._id);
        let temp = Object.entries(pointsToShow);
        setShown(temp);
    };

    const ReloadUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta:0.01,
          longitudeDelta:0.01
        })
    };

    useEffect(async () => {
        setIsLoading(true);
        await ReloadUserLocation();
        await ReloadMapPoints();
        setIsLoading(false);
        
    }, []);

    useEffect(async () => {
        if(mapFilter.includes("singleCharge")){
            let aux = shownChargePoints?.filter(markers => markers[1].id == wantRoute?.id)
            setShown(aux);
        }
        else{
            setIsLoading(true);
            await ReloadMapPoints();
            setIsLoading(false);
        }
    }, [mapFilter]);
    
      const {latitude,longitude} = userLocation;
    
    
    
    return (
        <MapContext.Provider value={
            {   shownChargePoints, 
                mapFilter,
                setMapFilter, 
                userLocation, 
                isLoading,
                userLocation,
                setSearchedPoint,
                wantRoute,
                setWantRoute,
                routeInfo,
                setRouteInfo,
                currentStationInfo,
                setStationInfo,
                ReloadUserLocation,
            }
        }>
            {children}
        </MapContext.Provider>
    )

}

export { MapContext, MapContextProvider };
