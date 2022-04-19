import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function Achievement(props) {
  const { title, actualProgress, total, url } = props;
  const progress = (actualProgress / total) * 100;
  const isCompleted = Math.floor(progress) === 100;
  return (
    <View style={styles.achievementBox}>
      <Image
        source={
          url !== ""
            ? { uri: url }
            : require("../../../../assets/images/icons/mechanical.png")
        }
        style={styles.image}
      ></Image>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{title}</Text>
        <View style={styles.progressBar}>
          <View
            style={
              ([StyleSheet.absoluteFill],
              { backgroundColor: "#8BED4F", width: `${progress}%` })
            }
          />
        </View>
      </View>
      <Image
        source={
          isCompleted
            ? require("../../../../assets/images/check.png")
            : require("../../../../assets/images/blank-check.png")
        }
        style={styles.image}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  achievementBox: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "beige",
  },
  image: {
    maxWidth: "12%",
    aspectRatio: 1,
    flex: 0.15,
  },
  achievementInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 0.7,
    maxWidth: "75%",
    height: "100%",
    padding: "1%",
    justifyContent: "space-between",
  },
  achievementTitle: {
    fontSize: 13,
  },
  progressBar: {
    flexDirection: "row",
    height: 20,
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export { Achievement };
