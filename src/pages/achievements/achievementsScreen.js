import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AchievementList from "./components/achievementList";
import i18n from "i18n-js";
import { useToast } from "react-native-toast-notifications";
import useAchievements from "../../hooks/useAchievements";
import useAuth from "../../hooks/useAuth";

function AchievementsScreen() {
  const {
    getAllAchievements,
    resetAchievements,
    displayAchievements,
    findMyAchievement,
    favAchievement,
  } = useAchievements();
  const { auth } = useAuth();

  const [achievements, setAchievements] = useState([]);

  useEffect(async () => {
    //resetAchievements();
    console.log(auth.user.likes.length)
    setAchievements(await displayAchievements());
  }, [auth?.user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("achievementScreen.subtitle")}</Text>
      <AchievementList achievementsInfo={achievements} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "6%",
    paddingHorizontal: "3%",
  },
  title: {
    fontSize: 25,
  },
});

export { AchievementsScreen };
