import React, { useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_HOST, IMGBB_API_KEY } from "@env";
import { AuthContext } from "../context/authContext";

const useUser = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const getUserInfo = async () => {
    const decodedToken = jwt_decode(auth.token);
    const id = decodedToken._id;
    const response = await axios.get(`${API_HOST}/api/users/${id}`);
    const data = response.data;
    return data.user;
  };

  const sendFavourite = async (station_id) => {
    const response = await axios.put(
      `${API_HOST}/api/users/${auth.user.id}/favourites`,
      {
        station_id,
      }
    );
    return response.data.user;
  };

  const updateProfilePicture = async (image64) => {
    try {
      var bodyData = new FormData();
      bodyData.append("image", image64);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: bodyData,
        }
      );
      const data = await response.json();
      const imageUrl = data.data.display_url;
      console.log(imageUrl);
      /* const decodedToken = jwt_decode(auth.token);
            const id = decodedToken._id;
            const res = await axios.post(`${API_HOST}/api/users/${id}/profilePicture`, {      
                image: imageUrl
            }); 
            return res.data; */
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserInfo,
    sendFavourite,
    updateProfilePicture,
  };
};

export default useUser;
