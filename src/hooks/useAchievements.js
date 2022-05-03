import React, { useContext, useState } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";
import { useToast } from "react-native-toast-notifications";
import i18n from "i18n-js";

const useAchievements = () => {
  const toast = useToast();
  const { auth, setAuth } = useAuth();

  const updateAchievement = async (id) => {
    let myAchievements = auth?.user.achievements;
    // Buscar quin achievement te el id desitjat
    for (let i = id; i < id + 3; i++) {
      if (myAchievements[i].actualProgress < myAchievements[i].total) {
        id = i;
        break;
      }
    }

    myAchievements[id].actualProgress++;
    setAuth({
      ...auth,
      user: {
        ...auth.user,
        achievements: myAchievements,
      },
    });

    if (myAchievements[id].actualProgress < myAchievements[id].total) {
      return;
    }

    /* actualiza achievement en backend con axios */
    await completeAchievement(id, myAchievements[id].actualProgress);

    toast.show("", {
      title: i18n.t("achievementToast.title"),
      message: `¡A robar ${id} bicis!`,
      type: "custom_type",
      location: "achievement",
    });
  };

  const completeAchievement = async (achievementId, totalProgress) => {
    try {
      const res = await axios.put(
        `${API_HOST}/api/users/${auth.user.id}/achievements/`,
        {
          achievementId,
          totalProgress,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateAchievement,
  };
};

export default useAchievements;
