import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function Toast(props) {
  const { message, type, title, image } = props;
  const image_type = () => {
    if (type === "achievement") {
      return image !== "" ? { uri: image }
      : require("../../assets/images/medal.png");
    } else if(type === "report") {
      return require("../../assets/images/check.png");
    } else if (type === "autonomia") {
      return require("../../assets/images/warning.png");
    } else {
      return require("../../assets/images/check.png");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image_type()} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
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

export default Toast;