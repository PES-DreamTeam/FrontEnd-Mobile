import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AchievementList from "./components/achievementList";
import i18n from "i18n-js";
import { useToast } from "react-native-toast-notifications";
import useAchievements from "../../hooks/useAchievements";
import useAuth from "../../hooks/useAuth";

function AchievementsScreen() {
  const { getAllAchievements, resetAchievements } = useAchievements();
  const { auth } = useAuth();

  const [achievements, setAchievements] = useState([]);


  useEffect(async () => {
    /* await resetAchievements(); */
    console.log(await getAllAchievements());
    console.log("se vienen los del user ahora")
    console.log(auth.user.achievements);
    setAchievements(await getAllAchievements());
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
