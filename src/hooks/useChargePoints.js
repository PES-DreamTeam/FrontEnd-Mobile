import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";

const useChargePoints = () => {
  const getChargePoints = async (filter, userId) => {
    let filterText = "";
    if (filter !== undefined && filter !== null && filter !== "all" && filter !== []) {
      for (let i = 0; i < filter.length; ++i) {
        if (filter[i] != "favs") {
          filterText += "&objectType[]=" + filter[i];
        } else {
          filterText += "&userId=" + userId;
        }
      }
    }

    const response = await axios.get(
      `${API_HOST}/api/chargePoints?groupBy=id${
        filter === null || filter === "all" || filter === [] ? "" : filterText
      }`
    );
    const data = response.data;
    return data.chargePoints;
  };

  const getSingleChargePoint = async (id_charge) => {
    const response = await axios.get(
      `${API_HOST}/api/chargePoints/${id_charge}`
    );
    const data = response.data;
    return data.chargePoint;
  };

  const getChargePointInfo = async (id_station) => {
    const response = await axios.get(
      `${API_HOST}/api/chargePoints/${id_station}/info`
    );
    return response.data.chargePoint;
  };

  const getChargePointLikes = async (id_station) => {
    const response = await axios.get(
      `${API_HOST}/api/chargePoints/${id_station}/info`
    );
    const data = response.data.chargePoint.likes;
    return data;
  };

  const sendStationLike = async (station_id) => {
    const response = await axios.put(
      `${API_HOST}/api/chargePoints/${station_id}/vote`
    );
    return response.data.likedStations;
  };

  const sendReport = async (station_id, reportType, reportMsg) => {
    try {
      const response = await axios.put(
        `${API_HOST}/api/chargePoints/${station_id}/report/`,
        {
          reportType: reportType,
          reportMsg: reportMsg,
        }
      );
    } catch (err) {
      let errors = [];
      if (err.response.status === 403) {
        err.response.data.errors.map((error) => {
          errors.push(error);
        });
        throw {
          error: true,
          errors: errors,
        };
      } else
        throw {
          error: true,
          errors: ["Something went wrong. Try again later."],
        };
    }
  };

  return {
    getChargePoints,
    getSingleChargePoint,
    getChargePointLikes,
    getChargePointInfo,
    sendStationLike,
    sendReport,
  };
};

export default useChargePoints;
