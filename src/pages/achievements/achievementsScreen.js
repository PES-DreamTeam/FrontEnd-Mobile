import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AchievementList from "./components/achievementList";
import i18n from "i18n-js";
import { useToast } from "react-native-toast-notifications";
import useAchievements from "../../hooks/useAchievements";
import useAuth from "../../hooks/useAuth";
import useUserSettings from "../../hooks/useUserSettings";

function AchievementsScreen() {
  useUserSettings();
  const {
    displayAchievements,
  } = useAchievements();
  const { auth } = useAuth();

  const [achievements, setAchievements] = useState([]);

  useEffect(async () => {
    setAchievements(await displayAchievements());
  }, [auth?.user]);

  return (
      <AchievementList achievementsInfo={achievements} />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "6%",
  },
  title: {
    fontSize: 25,
  },
});

export { AchievementsScreen };
