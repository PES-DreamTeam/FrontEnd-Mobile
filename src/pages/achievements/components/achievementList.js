import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import useAchievements from "../../../hooks/useAchievements";
import useAuth from "../../../hooks/useAuth";
import { Achievement } from "./achievement";

function achievementList(props) {
  const { achievementsInfo } = props;
  const { auth } = useAuth();
  const myAchievements = auth?.user?.achievements;
  const findAchievement = (id) => achievementsInfo.find((achievement) => achievement.achievement_id == id);

  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.achievementsList}>
        {myAchievements.map((achievement, index) => {
          let achievementInfo = findAchievement(achievement.achievement_id);
          return (
            <Achievement
              key={index}
              description={achievementInfo.description}
              actualProgress={achievement.progress}
              objective={achievement.objective}
              url={achievementInfo.image}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  listContainer: { 
    borderWidth: 1, 
    marginTop: "5%" 
  },
  achievementsList: {
    /*     maxHeight: "90%", */
  },
});

export default achievementList;
