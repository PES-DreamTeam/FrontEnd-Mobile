import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Achievement } from "./achievement";

function achievementList({ achievements }) {
  return (
    <View style={{ borderWidth: 1, marginTop: "5%" }}>
      <ScrollView style={styles.achievementsList}>
        {achievements.map((achievement, index) => (
          <Achievement
            key={index}
            title={achievement.title}
            actualProgress={achievement.actualProgress}
            total={achievement.total}
            url={achievement.url}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  achievementsList: {
    height: "85%",
  },
});

export default achievementList;
