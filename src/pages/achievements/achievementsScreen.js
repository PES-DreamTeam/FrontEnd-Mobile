import { React } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AchievementList from "./components/achievementList";
import i18n from "i18n-js";

function AchievementsScreen() {
  const achievements = [
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 2,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 3,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 4,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
    {
      title: "Cargar el coche 4 veces - 1/4",
      actualProgress: 1,
      total: 4,
      url: "",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("achievementScreen.subtitle")}</Text>
      <AchievementList achievements={achievements} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    paddingHorizontal: "3%",
  },
  title: {
    fontSize: 25,
  },
});

export { AchievementsScreen };
