
import React, { useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {API_HOST} from '@env';
import { AuthContext } from '../context/authContext';
const useUser = () => {

    const { auth } = useContext(AuthContext);

    const getUserInfo = async () => {
        const decodedToken = jwt_decode(auth.token);
        const id = decodedToken._id;
        const response = await axios.get(`${API_HOST}/api/users/${id}`);
        const data = response.data;
        return (data.user);
        
    }

    return { getUserInfo };
}

export default useUser;