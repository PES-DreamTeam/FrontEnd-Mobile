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
  let myAchievements = auth?.user.achievements;

  const updateAchievement = async (id, levels) => {
    let actualLevel;
    let inProgress = false;
    let achievementIP;
    // Buscar quin achievement te el id desitjat
    for (actualLevel = 1; actualLevel <= levels; actualLevel++) {
      achievementIP = findMyAchievement(id);
      if (achievementIP.progress < achievementIP.objective) {
        inProgress = true;
        break;
      }
      id++;
    }

    if (!inProgress) {
      return;
    }
    achievementIP.progress++;

    updateUser({
      ...auth.user,
      achievements: myAchievements,
    });

    /* actualiza achievement en backend con axios */
    const achievement = await completeAchievement(
      id,
      achievementIP.progress,
      achievementIP.objective
    );

    console.log(achievement);

    if (achievementIP.progress == achievementIP.objective) {
      //si té un nivell superior al actual, guarda el progres en el següent achievement
      if (actualLevel < levels) {
        await completeAchievement(
          id + 1,
          achievementIP.progress,
          achievementIP.objective
        );
      }
      toast.show("", {
        title: `${i18n.t("achievementToast.title")}`,
        message: achievement.description,
        type: "custom_type",
        location: "achievement",
      });
    }
  };

  const resetAchievements = async () => {
    for (let i = 0; i < myAchievements.length; i++) {
      myAchievements[i].progress = 0;
      await completeAchievement(i, 0);
    }
    updateUser({
      ...auth.user,
      achievements: myAchievements,
    });
  };

  const completeAchievement = async (achievement_id, progress, objective) => {
    try {
      const res = await axios.put(
        `${API_HOST}/api/users/${auth.user._id}/achievements`,
        {
          achievement_id,
          progress,
          objective,
        }
      );
      return res.data.achievement;
    } catch (error) {
      console.log(error.toString());
    }
  };

  const getAchievementInfo = async () => {
    try {
      console.log(`${API_HOST}/api/achievements/`);
      const res = await axios.get(`${API_HOST}/api/achievements/`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAchievements = async () => {
    try {
      const res = await axios.get(
        `${API_HOST}/api/users/${auth.user._id}/achievements/`
      );
      const data = res.data.achievements;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const findMyAchievement = (id) => {
    return myAchievements.find(
      (achievement) => achievement.achievement_id == id
    );
  };

  return {
    updateAchievement,
    getAchievementInfo,
    getAllAchievements,
    findMyAchievement,
    resetAchievements,
  };
};

export default useAchievements;
