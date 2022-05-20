import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import useAchievements from "../../../hooks/useAchievements";
import useAuth from "../../../hooks/useAuth";
import { Achievement } from "./achievement";

function achievementList(props) {
  const { achievementsInfo } = props;
  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.achievementsList}>
        {achievementsInfo.map((achievement, index) => {
          return (
            <Achievement
                key={index}
                description={achievement.description}
                actualProgress={achievement.progress}
                objective={achievement.objective}
                url={achievement.image}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  listContainer: { 
  },
  achievementsList: {
    /*     maxHeight: "90%", */
  },
  achievementContainer: {
    height: 80,
  },
});

export default achievementList;