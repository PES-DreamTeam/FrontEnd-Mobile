import React, { useContext, useState } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";
import { useToast } from "react-native-toast-notifications";
import i18n from "i18n-js";

const useAchievements = () => {
  const toast = useToast();
  const { auth, updateUser } = useAuth();

  const updateAchievement = async (id, levels) => {
    let myAchievements = auth?.user.achievements;
    // Buscar quin achievement te el id desitjat
    for (let i = id; i < id + levels; i++) {
      if (myAchievements[i].progress < myAchievements[i].objective) {
        id = i;
        break;
      }
    }

    if (myAchievements[i].progress === myAchievements[i].objective) {
      return;
    }
    myAchievements[id].progress++;

    updateUser({
      ...auth.user,
      achievements: myAchievements,
    });

    if (myAchievements[id].progress < myAchievements[id].objective) {
      return;
    }

    /* actualiza achievement en backend con axios */
    const achievement = await completeAchievement(
      id,
      myAchievements[id].objective
    );

    toast.show("", {
      title: `${i18n.t("achievementToast.title")}`,
      message: achievement.description,
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
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateAchievement,
  };
};

export default useAchievements;
