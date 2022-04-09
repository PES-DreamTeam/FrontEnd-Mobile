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
        let data = response.data;
        data.isSignedIn = true;
        setAuth(data);   
    }

    const signUp = async (user) => {
        const { name, email, password } = user;
        try{
            const response = await axios.post(`${API_HOST}/api/auth/register`, {
                name, 
                email,
                password
            })
            let data = response.data;
            data.isSignedIn = true;
            setAuth(data);
        }catch(err){
            let errors = [];
            if(err.response.status === 403)
            {
                err.response.data.errors.map(error => {errors.push(error);})
                throw {
                    error: true,	
                    errors: errors
                }
            }else
                throw {
                    error: true,
                    errors: ["Something went wrong. Try again later."]
                }
        }
        
    }

    const signOut = async () => {
        logout();
    }
    const isSignedIn = () => {
        return auth?.user && auth?.isSignedIn;
    }

    const updateUserAsync = async (user) => {
        await axios.put(`${API_HOST}/api/users`, user);
    }

    const updateUser = async (user) => {
        await updateUserAsync(user);
        setAuth({...auth, user});
    }
    
    const deleteAccount = async () => {
        await axios.delete(`${API_HOST}/api/users/${auth.user._id}`);
        logout();
    }

    return { signIn, signOut, signUp, isSignedIn, updateUser, deleteAccount, setAuth, auth };
}

export default useAuth;