import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";


const useChats = () => { 
  const sendChat = async (messages) => {
      console.log(messages)
      
  /*
    try {     
      const response = await axios.post(
        //`${API_HOST}/api/`,
        {
          messages[0]?.text, messages[0]?.createdAt
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
      */
  }
  return {
    sendChat
  };
};

export default useChats;
