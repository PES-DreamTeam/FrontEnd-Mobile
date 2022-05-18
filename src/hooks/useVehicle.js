import React, { useContext } from "react";
import axios from "axios";
import { API_HOST, IMGBB_API_KEY } from "@env";

const useVehicle = () => {

  const getVehicleBrands = async () => {
    try {
    const response = await axios.get(`${API_HOST}/api/sampleVehicles/brands`);
    const data = response.data;
    return data.brands;
    }
    catch(err) {
      console.log(err);
    }
  };

  const getVehicleModels = async (brand) => {
    try{
      const response = await axios.get(`${API_HOST}/api/sampleVehicles/models?brand=${brand}`);
      const data = response.data;
      console.log(brand);
      return data.models;
    }
    catch(err){
      console.log(err);
    }
  };

  return {
    getVehicleBrands,
    getVehicleModels
  };
};

export default useVehicle;