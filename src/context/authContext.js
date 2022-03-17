import axios from "axios";
import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const initialState = {
        token: null,
        isSignedIn: false
    }

    const [auth, setAuthState] = useState(initialState);

    const [firstTime, setFirstTime] = useState(true);

    const getAuthState = async () => {
        try {
            const authDataString = await AsyncStorage.getItem("auth");
            const authData = JSON.parse(authDataString);

            configureAxiosHeaders(authData.token);
            setAuthState({
                token: authData.token,
                isSignedIn: true
            });
        } catch (error) {
           setAuthState(initialState); 
        }
    }

    const setAuth = async (auth) => {
        try {
            auth.isSignedIn = true;
            await AsyncStorage.setItem("auth", JSON.stringify(auth));
            configureAxiosHeaders(auth.token);
            setAuthState(auth);
        } catch (error) {
          Promise.reject(error);  
        }
    }

    const logout = async () => {
        try {
           setAuthState(initialState);
           await AsyncStorage.removeItem("auth");
           configureAxiosHeaders(null);
        } catch (error) {
           Promise.reject(error); 
        }
    }

    const configureAxiosHeaders = (token) => {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    const setFirstTimeInApp = value => {
        setAuthState({
            ...auth,
            firstTimeInApp: value
        });
    }

    useEffect(() => {
        getAuthState();
    },[])

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, setFirstTime, firstTime}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }