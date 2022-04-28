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

  const updateAchievement = (id) => {
    let myAchievements = auth?.user.achievements;
    myAchievements.actualProgress += 1;
    setAuth({
      ...auth,
      user: {
        ...auth.user,
        achievements: myAchievements,
      },
    });

/*     if (myAchievements[id].actualProgress < myAchievements[id].total) {
      return;
    }  */

    /* actualiza achievement en backend con axios */
    /*  */

    toast.show("", {
      title: i18n.t("achievementToast.title"),
      message: `¡A robar ${id} bicis!`,
      type: "custom_type",
      location: "achievement",
    });
  };

  return {
    updateAchievement,
  };
};

export default useAchievements;
