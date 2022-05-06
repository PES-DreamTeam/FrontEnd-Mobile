import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Share } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from "i18n-js";


function Achievement(props) {
  const { description, actualProgress, objective, url } = props;

  const shareAchievement = async () => {
    console.log("Share achievement");
    const shareOptions = {
      message: `${i18n.t('achievementScreen.shareMessage')}` + "'" + `${description}` + "'.",
    }
    try {
      const shareResponse = await Share.share(shareOptions);
    } catch (error) {
      console.log(error);
    }
  }

  const progress = (actualProgress / objective) * 100;
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
      <Pressable style={styles.image} onPress={shareAchievement} >
        <Ionicons style={styles.shareIcon} name="share-social-outline" size={35}/>
      </Pressable>
      
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
  shareIcon: {
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
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
