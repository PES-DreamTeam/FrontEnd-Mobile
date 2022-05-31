import React, { useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_HOST, IMGBB_API_KEY } from "@env";
import { MapContext } from "../context/mapContext";

const useMap = () => {
  const { map, userLocation, shownChargePoints, searchedPoint, mapFilter, setMapFilter, searchType, setSearchedPoint,
    isLoading, wantRoute, setWantRoute, routeInfo, setRouteInfo, currentStationInfo, setStationInfo, ReloadUserLocation, loadMap} = useContext(MapContext);


  const ResetMapFilter = () => {
    setMapFilter(["vehicleStation"]);
  }

  const ChangeMapFilter = (filter) => {
    let temp = JSON.parse(JSON.stringify(mapFilter));
    console.log("---------------------");
    console.log("ChangeMapFilter: temp:", temp);
    let single = temp.indexOf("singleCharge");
    if(single !== -1) {
      temp.splice(single, 1);
    }
    let index = temp.indexOf(filter);
    console.log("ChangeMapFilter: index:", index);
    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(filter);
    }
    console.log("At end: temp:", temp);
    setMapFilter(temp);
  } 

  const recalcUserLocation = async () => {
    await ReloadUserLocation();
  }

  const loadMapAsync = async () => {
    await loadMap();
  }


  return {
    shownChargePoints, userLocation, mapFilter, ResetMapFilter, ChangeMapFilter, recalcUserLocation, setSearchedPoint,
     isLoading, wantRoute, setWantRoute, routeInfo, setRouteInfo, currentStationInfo, setStationInfo,
     loadMapAsync,
  };
};

export default useMap;
