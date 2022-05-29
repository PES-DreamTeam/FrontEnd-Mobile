import axios from "axios";
import { API_HOST } from "@env";

const useCloseStation = () =>  {
 
  
  const getCloserStation = async(latitude, longitude, howmany) =>{
    //console.log("url")
    //console.log(`${api}`,{latitude,longitude,howmany});
    const response = await axios.get(`${API_HOST}/api/service/closest?lat=${latitude}&lng=${longitude}&howMany=${howmany}
    `);
    const data = response.data
   
    return data
  }
  
  const getCloserStationAvailable = async(latitude, longitude, distance) =>{
    //console.log("url")
    //console.log(`${api}`,{latitude,longitude,howmany});
    const response = await axios.get(`${API_HOST}/api/service/closestAvailable?lat=${latitude}&lng=${longitude}&distance=${distance}
    `);
    const data = response.data
   
    return data
  }

  return {
    getCloserStation,
    getCloserStationAvailable,
  };
};
export default useCloseStation;