import React, { useContext } from "react";
import axios from "axios";

const EXTERNAL_API = 'https://socialout-develop.herokuapp.com/v1/air';

const useExternalService = () => {

    const getStationPollution = async (lat,lng) => {
        try {
            const res = await axios.get(`${EXTERNAL_API}/location?lat=${lat}&long=${lng}`);
            return res.data.pollution;
        } catch (error) {
        console.log(error);
        }
    };

    const getAllPollutionStations = async () => {
        try {
            const res = await axios.get(`${EXTERNAL_API}/stations`);
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getStationPollution,
        getAllPollutionStations,
    };
}


export default useExternalService;