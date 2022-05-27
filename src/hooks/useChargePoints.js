import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";
import { useToast } from "react-native-toast-notifications";
import i18n from "i18n-js";

const useChargePoints = () => {
  const toast = useToast();
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
    try {
      //console.log("sendStationLike");
    const response = await axios.put(
      `${API_HOST}/api/chargePoints/${station_id}/vote`
    );
    return response.data.likedStations;
    } catch (error) {
      console.log("ERROR HOLI");
    }
  };

  const sendReport = async (station_id, reportType, reportMsg, stationType) => {
    try {
      const response = await axios.put(
        `${API_HOST}/api/chargePoints/${station_id}/report/`,
        {
          reportType: reportType,
          reportMsg: reportMsg,
          stationType: stationType,
        }
      );
      toast.show("", {
        title: i18n.t("reportToast.title"),
        message: i18n.t("reportToast.message"),
        type: "custom_type",
        location: "report",
      });
    } catch (err) {
      let errors = [];
      if (err?.response?.status === 403) {
        err?.response?.data?.errors?.map((error) => {
          errors.push(error);
        });
        console.log(errors);
        toast.show("", {
          title: `${i18n.t("reportToast.titleError")}`,
          message: `${i18n.t("reportToast.messageError")}`,
          type: "custom_type",
          location: "autonomia",
        });

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
