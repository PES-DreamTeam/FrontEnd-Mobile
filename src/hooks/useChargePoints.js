
import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
import { AuthContext } from '../context/authContext';
const useChargePoints = () => {


    const getChargePoints = async (filter) => {
       // console.log(`/api/chargePoints?groupBy=id&objectType=`+filter);
        const response = await axios.get(`${API_HOST}/api/chargePoints?groupBy=id&objectType=`+filter);
        const data = response.data;
        return (data.chargePoints);
        
    }

    
    const getSingleChargePoint = async (id_charge) => {
        //console.log(id_charge)
        const response = await axios.get(`${API_HOST}/api/chargePoints/${id_charge}`);
        const data = response.data;
        return (data.chargePoint);
    }

    return {  getChargePoints, getSingleChargePoint};
}

export default useChargePoints;