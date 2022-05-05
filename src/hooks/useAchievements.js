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
    let actualLevel;
    // Buscar quin achievement te el id desitjat
    for (actualLevel = 1; actualLevel <= levels; actualLevel++) {
      if (myAchievements[id].progress < myAchievements[id].objective) {
        break;
      }
      id++;
    }

    if (id >= id + levels) {
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

    //si té un nivell superior al actual, guarda el progres en el següent achievement
    if (actualLevel < levels) {
      await completeAchievement(id + 1, myAchievements[id].objective);
    }

    toast.show("", {
      title: `${i18n.t("achievementToast.title")}`,
      message: achievement.description,
      type: "custom_type",
      location: "achievement",
    });
  };

  const completeAchievement = async (achievementId, progress) => {
    try {
      const res = await axios.put(
        `${API_HOST}/api/users/${auth.user.id}/achievements/`,
        {
          achievementId,
          progress,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAchievementInfo = async (id) => {
    try {
      const res = await axios.get(`${API_HOST}/api/achievements/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAchievements = async () => {
    try {
      const res = await axios.get(`${API_HOST}/api/achievements/`);
      const data = res.data.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateAchievement,
    getAchievementInfo,
    getAllAchievements,
  };
};

export default useAchievements;
