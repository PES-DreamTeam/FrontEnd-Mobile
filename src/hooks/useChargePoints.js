import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";
import { useToast } from "react-native-toast-notifications";
import i18n from "i18n-js";

const useChargePoints = () => {
  const toast = useToast();
  const { auth } = useAuth();
  const getChargePoints = async (filter, userId) => {
    try {
      let filterText = "";
      if (
        filter !== undefined &&
        filter !== null &&
        filter !== "all" &&
        filter !== []
      ) {
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
      
      const data = response?.data;
      return data?.chargePoints;
    } catch (error) {
      console.log("Error en el get all sations", error);
    }
  };

  const getSingleChargePoint = async (id_charge) => {
    try {
      const response = await axios.get(
        `${API_HOST}/api/chargePoints/${id_charge}`
      );
      const data = response?.data;
      return data.chargePoint;
    } catch (error) {
      console.log("Error en el get single charge point", error);
      return null;
    }
  };

  const getChargePointInfo = async (id_station) => {
    try {
      const response = await axios.get(
        `${API_HOST}/api/chargePoints/${id_station}/info`
      );
      if(response !== undefined && response !== null){
        const data = response?.data;
        return data?.chargePoint;
      }
      else {
        return null;
      }
    } catch (error) {
      console.log("error en getChargePointInfo", error);
      return null;
    }
  };

  const getChargePointLikes = async (id_station) => {
    try {
      const response = await axios.get(
        `${API_HOST}/api/chargePoints/${id_station}/info`
      );
      const data = response?.data?.chargePoint?.likes;
      return data;
    } catch (error) {
      return 0;
    }
  };

  const sendStationLike = async (station_id) => {
    try {
      //console.log("sendStationLike");
      const response = await axios.put(
        `${API_HOST}/api/chargePoints/${station_id}/vote`
      );
      return response.data.likedStations;
    } catch (error) {
      console.log("error en sendStationLike", error);

    }
  };

  const sendReport = async (station_id, reportType, reportMsg, stationType) => {
    try {
      console.log({
        reportType: reportType,
        reportMsg: reportMsg,
        stationType: stationType,
        userName: auth?.user.nickname,
        user_id: auth?.user._id,
        station_id: station_id,
      });
      const response = await axios.put(
        `${API_HOST}/api/chargePoints/${station_id}/report/`,
        {
          reportType: reportType,
          reportMsg: reportMsg,
          stationType: stationType,
          userName: auth?.user.nickname,
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
          errors: err,
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
