import React, { useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_HOST, IMGBB_API_KEY } from "@env";
import { MapContext } from "../context/mapContext";

const useMap = () => {
  const { map, userLocation, shownChargePoints, searchedPoint, mapFilter, setMapFilter, searchType,
    wantRoute, setWantRoute, routeInfo, setRouteInfo, currentStationInfo, setStationInfo, } = useContext(MapContext);

  const ChangeMapFilter = (filter) => {
    let temp = JSON.parse(JSON.stringify(mapFilter));
    temp = temp.indexOf("singleCharge") !== -1 ? deleteSingle(temp) : temp;
    let index = temp.indexOf(filter);
    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(filter);
    }
    setMapFilter(temp);
  } 

  return {
    shownChargePoints, userLocation, mapFilter, ChangeMapFilter,
    wantRoute, setWantRoute, routeInfo, setRouteInfo, currentStationInfo, setStationInfo,
  };
};

export default useMap;
