import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";

const useReportAplication = () => { 
  const sendReport = async (pickerVal,platform,osVersion,subject,details) => {
    try {     
      const response = await axios.post(
        `${API_HOST}/api/report`,
        {
          type: pickerVal,
          platform: platform,
          os: osVersion,
          subject: subject,
          details:details
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
    sendReport
  };
};

export default useReportAplication;
