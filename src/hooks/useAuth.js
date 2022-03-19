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
        return auth?.isSignedIn;
    }

    const updateUserAsync = async (user) => {
        await axios.put(`${API_HOST}/api/users`, user);
    }

    const updateUser = async (user) =>{
        await updateUserAsync(user);
        setAuth({...auth, user});
    }

    return { signIn, signOut, signUp, isSignedIn, updateUser, setAuth, auth };
}

export default useAuth;