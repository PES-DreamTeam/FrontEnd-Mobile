
import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
import { AuthContext } from '../context/authContext';
const useChargePoints = () => {


    const getChargePoints = async () => {
        
        const response = await axios.get(`${API_HOST}/api/chargePoints?groupBy=id`);
        const data = response.data;
        return (data.chargePoints);
        
    }

    return {  getChargePoints };
}

export default useChargePoints;