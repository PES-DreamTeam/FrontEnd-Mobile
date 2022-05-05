import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function Achievement(props) {
  const { description, actualProgress, objective, url } = props;
  const progress = (actualProgress / objective) * 100;
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
        <View style={styles.textView}>
          <Text style={styles.achievementTitle}>{description}</Text>
          <Text style={styles.achievementTitle}>
            {actualProgress}/{objective}
          </Text>
        </View>
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
    marginLeft: "auto",
    marginRight: "auto",
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
  textView: {
    marginHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  achievementTitle: {
    fontSize: 13,
  },
  progressBar: {
    flexDirection: "row",
    height: 20,
    width: "95%",
    backgroundColor: "white",
    borderColor: "#000",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export { Achievement };
