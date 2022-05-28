import axios from "axios";

// import { API_HOST } from "@env";

const API_HOST = "https://pes-backend-development.herokuapp.com";

const useHighlights = () => {

    const getAllHighlights = async () => {
        try {
            const res = await axios.get(`${API_HOST}/api/tools/highlight`);
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const getHighlightById = async (id) => {
        try {
            const res = await axios.get(`${API_HOST}/api/tools/highlight/${id}`);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getAllHighlights,
        getHighlightById,
    };
}


export default useHighlights;