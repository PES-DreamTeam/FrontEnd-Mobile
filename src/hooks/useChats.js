import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";


const useChats = () => { 
  const sendChat = async (text,created_at) => {
    try {     
      const response = await axios.post(
        //`${API_HOST}/api/`,
        {
          text: text,
          created_at: created_at
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
    sendChat
  };
};

export default useChats;
