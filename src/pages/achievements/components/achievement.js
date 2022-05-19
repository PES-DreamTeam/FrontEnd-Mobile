import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Share } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from "i18n-js";
import CustomProgressBar from "../../../utils/customProgressBar";


function Achievement(props) {
  const customStyle = require('../../../utils/customStyleSheet');

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
    <View style={customStyle.blockContainer}>
      <View style={[customStyle.blockTitleContainer]}>
        <Text style={customStyle.bigTitle}>{description}</Text>
      </View>
      <Image
        source={
          require("../../../../assets/images/icons/mechanical.png")
        }
        style={styles.image}
      />
      <View style={styles.achievementInfo}>
        <View style={styles.textView}>
          
          <Text style={styles.achievementTitle}>
            {actualProgress}/{objective}
          </Text>
        </View>
        
        <CustomProgressBar
          percent={`${progress}`}
          backgroundStyle={{height: 20, width: '100%'}}
        />
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
    backgroundColor: "beige",
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "flex-end",
  },
  shareIcon: {
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
  achievementInfo: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "75%",
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
    height: 20,
    width: "95%",
  },
});

export { Achievement };
