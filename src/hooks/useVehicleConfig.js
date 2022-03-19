import React, { useContext } from 'react';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {API_HOST} from '@env';
import { AuthContext } from '../context/authContext';

const useVehicleConfig = () => {

    const { auth } = useContext(AuthContext);

    const sendConfig = async (vehicle) => {
        const { vehicleBrand, vehicleModel, vehicleNickname, vehicleType, vehicleColor } = vehicle;
        console.log(vehicleBrand);
        const decodedToken = jwt_decode(auth.token);
        const id = decodedToken._id;
        await axios.post(`${API_HOST}/api/users/${id}/vehicleConfig`, {
            vehicleBrand,
            vehicleModel,
            vehicleNickname,
            vehicleType,
            vehicleColor,
        });
    }; 

  return { sendConfig };
};

export default useVehicleConfig;
