import React, { useContext, useState } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";
import { useToast } from "react-native-toast-notifications";

const useAchievements = () => {
  const toast = useToast();
  const { auth, setAuth } = useAuth();

  const updateAchievement = (id) => {
    /* sumar 1 al achievement con el id indicado */
/*     let myAchievements = auth?.user.achievements;
    myAchievements.actualProgress += 1;
    setAuth({
      ...auth,
      user: {
        ...auth.user,
        achievements: myAchievements,
      },
    });

    if (myAchievements[id].actualProgress < myAchievements[id].total) {
      return;
    } */

    /* actualiza achievement en backend con axios */
    /*  */
    

    toast.show(`¡A robar ${id} bicis!`, {
      type: "type_achievement",
      title: "¡Logro completado!",
    });
  };

  return {
    updateAchievement,
  };
};

export default useAchievements;
