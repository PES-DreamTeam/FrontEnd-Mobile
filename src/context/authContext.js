import axios from "axios";
import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { API_HOST } from "@env";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const initialState = {
        token: null,
        user:null,
        isSignedIn: false
    }

    const [auth, setAuthState] = useState(initialState);

    const getAuthState = async () => {
        try {
            const authDataString = await AsyncStorage.getItem("auth");
            const authData = JSON.parse(authDataString);
            socket.io.opts.query = { userId: authData.user.id};
            configureAxiosHeaders(authData.token);
            setAuthState({
                token: authData.token,
                user:authData.user,
                isSignedIn: true
            });
        } catch (error) {
           setAuthState(initialState); 
        }
    }

    const setAuth = async (auth) => {
        try {
            await AsyncStorage.setItem("auth", JSON.stringify(auth));
            configureAxiosHeaders(auth.token);
            setAuthState(auth);
        } catch (error) {
          Promise.reject(error);  
        }
    }

    const logout = async () => {
        try {
           await AsyncStorage.removeItem("auth");
           configureAxiosHeaders(null);
           setAuthState(initialState);
        } catch (error) {
           Promise.reject(error); 
        }
    }

    const configureAxiosHeaders = (token) => {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    const socket = io(API_HOST);

    useEffect(() => {
        getAuthState();
    },[])

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, socket }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }