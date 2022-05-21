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
      message: `${i18n.t('achievementScreen.shareMessage')}` + "'" + `${i18n.t('achievementScreen.Achievements.' + description + "Title")}` + "'.",
    }
    try {
      const shareResponse = await Share.share(shareOptions);
    } catch (error) {
      console.log(error);
    }
  }

  const progress = (actualProgress / objective) * 100;
  return (
    <View style={customStyle.coolBlockContainer}>
      <View style={[customStyle.coolBlockTitleContainer, {height: 80}]}>
        <Text style={customStyle.title}>{i18n.t('achievementScreen.Achievements.' + description + "Title")}</Text>
      </View>
      <View style={customStyle.coolBlockImageContainer}>
        <Image
        source={
          require("../../../../assets/images/icons/mechanical.png")
        }
        style={customStyle.coolBlockImage}
        />
      </View>
      <View style={customStyle.blockContentContainer}>
        <View style={styles.achievementInfo}>
          <View style={styles.textView}>
            <Text style={customStyle.normalText}>{i18n.t('achievementScreen.Achievements.' + description + "Description")}</Text>
          </View>
          <View style={styles.progressBarView}>
            <View style={styles.progressView}>
              <CustomProgressBar
                text={actualProgress+"/"+objective}
                percent={`${progress}`}
                backgroundStyle={{height: 30, width: '100%'}}
                />
            </View>
            <View style={styles.shareView}>
              <Pressable style={styles.imag} onPress={shareAchievement} >
                <Ionicons style={styles.shareIcon} name="share-social-outline" size={25}/>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
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
    width: '70%',
    height: '70%',
  },
  shareIcon: {
    right: 0,
    aspectRatio: 1,
    width: "50%",
  },
  achievementInfo: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    padding: "1%",
    justifyContent: "space-between",
  },
  textView: {
    marginHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBarView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  progressView: {
    width: "80%",
  },
  shareView: {
    width: "20%",
    alignItems: "center",
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
