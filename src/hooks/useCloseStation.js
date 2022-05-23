import React, { useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_HOST, IMGBB_API_KEY } from "@env";
import { AuthContext } from "../context/authContext";

const api = "https://pes-backend-development.herokuapp.com/api/service/closest?"
const urlbien = "https://pes-backend-development.herokuapp.com/api/service/closest?lat=41.4244875&lng=2.2037269&howMany=1"
const useCloseStation = () =>  {
 
  
  const getCloserStation = async(latitude, longitude, howmany) =>{
    //console.log("url")
    //console.log(`${api}`,{latitude,longitude,howmany});
    const response = await axios.get("https://pes-backend-development.herokuapp.com/api/service/closest?lat=41.4244875&lng=2.2037269&howMany=1");
    const data = response.data
   
    return data
  }
  return {
    getCloserStation
  };
};
export default useCloseStation;
    
    
