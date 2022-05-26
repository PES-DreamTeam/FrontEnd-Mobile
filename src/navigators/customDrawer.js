import React from "react";
import {
  Share,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import useAuth from "../hooks/useAuth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import i18n from "i18n-js";
import Ionicons from "react-native-vector-icons/Ionicons";
import files64 from "../../assets/filesBase64";
import useAchievements from "../hooks/useAchievements";

function CustomDrawer(props) {
  const { updateAchievement } = useAchievements();

  const customStyle = require("../utils/customStyleSheet");

  const TellAFriend = async () => {
    const shareOptions = {
      message: `${i18n.t("drawer.shareMessage")}`,
      url: files64.ecoRoadsLogo,
    };
    try {
      const shareResponse = await Share.share(shareOptions);
      if (shareResponse.action === Share.sharedAction) {
        updateAchievement(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { auth, signOut } = useAuth();

  const { user } = auth;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        drawerActiveTintColor="red"
        contentContainerStyle={{ backgroundColor: "#8200d6" }}
      >
        <View
          style={{ padding: 20, backgroundColor: "#8200d6"}}
        >
          <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
          <Image
            source={{ uri: user.profilePicture }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
            
          />
          </TouchableOpacity>
          <Text
            style={[customStyle.normalText, {color: "#fff"}]}
          >
            {user?.nickname}
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>

      <TouchableOpacity
          onPress={() => props.navigation.navigate("Help")}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="chat-alert-outline" size={22} />
            <Text
              style={[customStyle.normalText, { marginLeft: 10 }]}
              >
                {i18n.t("drawer.help")}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("ReportApplicationScreen")}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="megaphone-outline" size={22} />
            <Text
              style={[customStyle.normalText, { marginLeft: 10 }]}
              >
                {`${i18n.t("drawer.report")}`}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={TellAFriend} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={[customStyle.normalText, { marginLeft: 10 }]}
            >
              {`${i18n.t("drawer.tellAFriend")}`}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={[customStyle.normalText, { marginLeft: 10 }]}
              onPress={() => signOut()}
            >
              {`${i18n.t("drawer.logOut")}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { CustomDrawer };
