import React, { useContext, useState, useEffect } from "react";
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
  
  const updateAchievement = async (id, length) => {
    const idAchievements = filterById(id);
    let actualLevel = 1;
    let inProgress = false;
    idAchievements.forEach((achievement) => {
      if (achievement.progress < achievement.objective && !inProgress) {
        inProgress = true;
        actualLevel = achievement.achievement_tier;
      }
    });
    //si estan tots complets
    if (!inProgress) return;

    const achievementIP = findMyAchievement(id, actualLevel);
    
    let newProgress;

    if (id >= 5) {
      newProgress = likeAchievement(achievementIP.progress, length);
    } else {
      newProgress = achievementIP.progress;
      newProgress++;
    }
    if (newProgress === -1) return;
    
    achievementIP.progress++;
    updateUser({
      ...auth.user,
      achievements: myAchievements,
    });

    const achievement = await completeAchievement(id, actualLevel, newProgress);
    /* actualiza achievement en backend con axios */
    if (achievementIP.progress >= achievementIP.objective) {
      //si té un nivell superior al actual, guarda el progres en el següent achievement
      const nextAchievement = findMyAchievement(id, actualLevel + 1);
      if (actualLevel < 3) {
        nextAchievement.progress = achievementIP.progress;
        updateUser({
          ...auth.user,
          achievements: myAchievements,
        });
        await completeAchievement(id, actualLevel + 1, achievementIP.progress);
      }
      toast.show("", {
        title: `${i18n.t("achievementToast.title")}`,
        message: achievement.description,
        image: achievement.image,
        type: "custom_type",
        location: "achievement",
      });
    }
  };

  const likeAchievement = (progress, length) => {
    if (length > progress) {
      return length;
    }
    return -1;
  };


  const displayAchievements = async () => {
    const achievements = await getAllAchievements();
    const newAchievements = [];
    const unique = [
      ...new Set(achievements.map((achievement) => achievement.achievement_id)),
    ];
    unique.forEach((id) => {
      const idAchievements = achievements.filter(
        (achievement) => achievement.achievement_id == id
      );
      let inProgress = false;
      idAchievements.forEach((achievement) => {
        if (achievement.progress < achievement.objective && !inProgress) {
          newAchievements.push(achievement);
          inProgress = true;
        }
        if (achievement.achievement_tier == 3 && !inProgress) {
          newAchievements.push(achievement);
        }
      });
    });
    return newAchievements;
  };

  const resetAchievements = async () => {
    myAchievements.map(async (achievement) => {
      achievement.progress = 0;
      await completeAchievement(achievement.achievement_id, achievement_tier, 0);
    });
    updateUser({
      ...auth.user,
      achievements: myAchievements
    });
  };

  const completeAchievement = async (
    achievement_id,
    achievement_tier,
    progress
  ) => {
    try {
      const res = await axios.put(
        `${API_HOST}/api/users/${auth.user._id}/achievements`,
        {
          achievement_id,
          achievement_tier,
          progress,
        }
      );
      return res.data.achievement;
    } catch (error) {
      console.log(error.toString());
    }
  };

  const getAchievementInfo = async () => {
    try {
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

  const filterById = (id) => {
    return myAchievements.filter((achievement) => {
      return achievement.achievement_id == id;
    });
  };

  const findMyAchievement = (id, tier) => {
    return myAchievements.find((achievement) => {
      return (
        achievement.achievement_id == id && achievement.achievement_tier == tier
      );
    });
  };

  return {
    updateAchievement,
    getAchievementInfo,
    getAllAchievements,
    findMyAchievement,
    resetAchievements,
    displayAchievements,
  };
};

export default useAchievements;
