import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function achievementToast(props) {
  const { message } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/medal.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Logro completado</Text>
        <Text style={styles.description}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "beige",
    width: "98%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 10,
    height: 10,
    aspectRatio: 1,
    flex: 0.12,
  },
  textContainer: {
    flex: 0.85,
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    color: "black",
  },
  description: {
    fontSize: 14,
    color: "grey",
  },
});

export default achievementToast;
