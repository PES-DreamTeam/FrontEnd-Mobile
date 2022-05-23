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
            const response = await axios.post(`${API_HOST}/api/users/${id}/vehicleConfig`, {      
                brand: vehicleBrand.trim(),
                model: vehicleModel.trim(),
                nickname: vehicleNickname.trim(),
                color: vehicleColor,
                numberPlate: numberPlate.trim(),
                vehicleType: vehicleType,
            });        
            const user = await axios.get(`${API_HOST}/api/users/${id}`);
            return user.data.user;
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

    const deleteVehicleConfig = async (numberPlate) => {
        const id = auth.user._id;
        try {
            const response = await axios.delete(`${API_HOST}/api/users/${id}/vehicleConfig/${numberPlate.trim()}`);
        } 
        catch(error) {
            console.log(error);
        };
    };
    
  return { sendConfig, deleteVehicleConfig };
};

export default useVehicleConfig;
