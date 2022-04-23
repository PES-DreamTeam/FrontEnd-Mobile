import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";
const useChargePoints = () => {
  const getChargePoints = async (filter) => {
    const response = await axios.get(
      `${API_HOST}/api/chargePoints?groupBy=id${(filter === null || filter === "all") ? "" : `&objectType[]=${filter}`}` 
    );
    const data = response.data;
    return data.chargePoints;
  };

  const getSingleChargePoint = async (id_charge) => {
    const response = await axios.get(
      `${API_HOST}/api/chargePoints/${id_charge}`
    );
    const data = response.data;
    console.log("hola");
    console.log(data);
    console.log("adeu");
    return data.chargePoint;
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
    /*     console.log(response.data.user.likes); */
  };

  const sendReport = async (station_id, reportType, reportMsg) => {
    try {
      const response = await axios.put(
        `${API_HOST}/api/chargePoints/${station_id}/report/`,
        {
          reportType: reportType,
          reportMsg: reportMsg
        }
      );
    }
    catch(err) {
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

  }

  return {
    getChargePoints,
    getSingleChargePoint,
    getChargePointLikes,
    sendStationLike,
    sendReport,
  };
};

export default useChargePoints;
