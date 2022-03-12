
import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
import { AuthContext } from '../context/authContext';
const useAuth = () => {

    const { auth, setAuth, logout } = useContext(AuthContext);
    const signIn = async (user) => {
        const { email, password } = user;
        const response = await axios.post(`${API_HOST}/api/auth/login`, {
            email,
            password,
        })
        const data = response.data;
        setAuth(data);   
    }

    const signUp = async (user) => {
        const { name, email, password } = user;
        const response = await axios.post(`${API_HOST}/api/auth/register`, {
            name, 
            email,
            password
        })
        const data = response.data;
        setAuth(data);
    }

    const signOut = async () => {
        logout();
    }
    const isSignedIn = () => {
        console.log(auth?.isSignedIn);
        return auth?.isSignedIn;
    }

    return { signIn, signOut, signUp, isSignedIn };
}

export default useAuth;