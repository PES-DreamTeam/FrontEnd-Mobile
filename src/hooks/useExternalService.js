import axios from "axios";

import { EXTERNAL_API_HOST } from "@env";

const useExternalService = () => {

    const getStationPollution = async (lat,lng) => {
        try {
            const res = await axios.get(`${EXTERNAL_API_HOST}/location?lat=${lat}&long=${lng}`);
            return res.data.pollution;
        } catch (error) {
        //console.log(error);
        }
    };

    const getAllPollutionStations = async () => {
        try {
            const res = await axios.get(`${EXTERNAL_API_HOST}/stations`);
            return res;
        } catch (error) {
            //console.log(error);
        }
    }

    return {
        getStationPollution,
        getAllPollutionStations,
    };
}


export default useExternalService;