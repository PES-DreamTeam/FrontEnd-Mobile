import React, { useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_HOST, IMGBB_API_KEY } from "@env";
import { MapContext } from "../context/mapContext";

const useMap = () => {
  const { map, userLocation, shownChargePoints, searchedPoint, mapFilter, setMapFilter, searchType, setSearchedPoint,
    wantRoute, setWantRoute, routeInfo, setRouteInfo, currentStationInfo, setStationInfo, ReloadUserLocation} = useContext(MapContext);

  const ChangeMapFilter = (filter) => {
    let temp = JSON.parse(JSON.stringify(mapFilter));
    let single = temp.indexOf("singleCharge");
    if(single !== -1) {
      temp.splice(single, 1);
    }
    let index = temp.indexOf(filter);
    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(filter);
    }
    setMapFilter(temp);
  } 

  const recalcUserLocation = async () => {
    await ReloadUserLocation();
  }

  return {
    shownChargePoints, userLocation, mapFilter, ChangeMapFilter, recalcUserLocation, setSearchedPoint,
    wantRoute, setWantRoute, routeInfo, setRouteInfo, currentStationInfo, setStationInfo,
  };
};

export default useMap;
