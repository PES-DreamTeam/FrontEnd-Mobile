import React, { useContext } from 'react';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {API_HOST} from '@env';
import { AuthContext } from '../context/authContext';

const useVehicleConfig = () => {

    const { auth } = useContext(AuthContext);

    const sendConfig = async (vehicle) => {
        const { vehicleBrand, vehicleModel, vehicleNickname, vehicleType, vehicleColor, numberPlate} = vehicle;
        const decodedToken = jwt_decode(auth.token);
        const id = decodedToken._id;
        try {
            await axios.post(`${API_HOST}/api/users/${id}/vehicleConfig`, {      
                brand: vehicleBrand,
                model: vehicleModel,
                nickname: vehicleNickname,
                color: vehicleColor,
                numberPlate: numberPlate,
                vehicleType: vehicleType,
            });        
        } catch(error) {
            if(error.response.status === 409) {
                throw { 
                    attribute : error.response.data.attribute,
                    error: error.response.data.error,
                } 
            }
            else{
                throw { 
                    attribute : "Unknown",
                    error: "Something went wrong. Try again later.",
                } 
            }
        };
    }; 

  return { sendConfig };
};

export default useVehicleConfig;
