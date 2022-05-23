import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";
import * as Facebook from "expo-facebook";

const useAuth = () => {
  const { auth, setAuth, logout } = useContext(AuthContext);

  const signIn = async (user) => {
    const { email, password } = user;
    const response = await axios.post(`${API_HOST}/api/auth/login`, {
      email,
      password,
    });
    let data = response.data;
    data.isSignedIn = true;
    setAuth(data);
  };

  const signUp = async (user) => {
    const { name, email, password } = user;
    try {
      const response = await axios.post(`${API_HOST}/api/auth/register`, {
        name,
        email,
        password,
      });
      let data = response.data;
      data.isSignedIn = true;
      setAuth(data);
    } catch (err) {
      let errors = [];
      if (err.response.status === 403) {
        err.response.data.errors.map((error) => {
          errors.push(error);
        });
        throw {
          error: true,
          errors: errors,
        };
      } else
        throw {
          error: true,
          errors: ["Something went wrong. Try again later."],
        };
    }
  };

  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({ appId: "280395620820314" });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        let response = await axios.get(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        );
        response = await loginWithSocialMedia(token, "facebook");
        let auth = response.data;
        auth.isSignedIn = true;
        setAuth(auth);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const loginWithSocialMedia = async (token, socialMedia) => {
    return await axios.post(
      `${API_HOST}/api/auth/social-login?token=${token}`,
      {
        socialMedia,
      }
    );
  };

  const signOut = async () => {
    logout();
  };
  const isSignedIn = () => {
    return auth?.user && auth?.isSignedIn;
  };

  const updateUserAsync = async (user) => {
    await axios.put(`${API_HOST}/api/users`, user);
  };

  const updateUser = async (user, updateBack = true) => {
    if(updateBack) {
      await updateUserAsync(user);
    }
    setAuth({ ...auth, user });
  };

  const deleteAccount = async () => {
    await axios.delete(`${API_HOST}/api/users/${auth.user._id}`);
    logout();
  };

  return {
    signIn,
    signOut,
    signUp,
    isSignedIn,
    updateUser,
    deleteAccount,
    loginWithFacebook,
    setAuth,
    auth,
  };
};

export default useAuth;
