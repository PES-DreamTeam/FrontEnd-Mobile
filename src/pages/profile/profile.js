import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import i18n from "i18n-js";
import useAuth from "../../hooks/useAuth";
import useUserSettings from "../../hooks/useUserSettings";
import CarInfoModal from "./profileComponents/carInfoModal";
import Carousel from "react-native-snap-carousel";
import UploadImage from "./profileComponents/UploadImage";
import CustomButton from "../../utils/button";
import { useToast } from "react-native-toast-notifications";

import ButtonTable from "../../utils/buttonTable";

function TextEditableLabel({
  editable,
  textValue,
  labelName,
  normalStyle,
  editableStyle,
  ChangeText,
  localizationKey,
}) {
  if (editable) {
    return (
      <TextInput
        onChangeText={(text) => ChangeText(text, labelName)}
        value={textValue}
        style={[editableStyle]}
        name={labelName}
        placeholder={i18n.t(localizationKey)}
      />
    );
  } else {
    return <Text style={[normalStyle]}>{textValue}</Text>;
  }
}

function ProfileScreen({ navigation }) {

  var vehicleImages = [
    require( '../../../assets/images/carTypes/carType_0.png'),
    require( '../../../assets/images/carTypes/carType_1.png'),
    require( '../../../assets/images/carTypes/carType_2.png'),
    require( '../../../assets/images/carTypes/carType_3.png'),
    require( '../../../assets/images/carTypes/carType_4.png'),
    require( '../../../assets/images/carTypes/carType_5.png'),
    require( '../../../assets/images/carTypes/carType_6.png'),
    require( '../../../assets/images/carTypes/carType_7.png'),
    require( '../../../assets/images/carTypes/carType_8.png'),
]

  const customStyle = require('../../utils/customStyleSheet');

  const { auth, updateUser } = useAuth();
  const [ vehicleModalOpened, setVehicleModalOpened ] = useState(false);
  const toast = useToast();
  useUserSettings();

  const [user, setUser] = useState({
    id: auth.user._id,
    email: auth.user.email,
    name: auth.user.nickname,
    vehicleConfig: auth.user.vehicleConfig,
    currentVehicle: auth.user.currentVehicle ?? 0,
  });
  useEffect(() => {
    setUser({
      id: auth.user._id,
      email: auth.user.email,
      name: auth.user.nickname,
      vehicleConfig: auth.user.vehicleConfig,
      currentVehicle: auth.user.currentVehicle ?? 0,
    });
    auth.user;
    let temp = [];
    for(let i = 0; i < vehicleConfig.length; i++){
      let tempObj = {
        imageSrc: vehicleImages[vehicleConfig[i].vehicleType],
        imageStyle: {width: '100%', height:'50%', tintColor: vehicleConfig[i].color, alignSelf: "center"},
        onPress: () => {
          setVehicleSelected(i);
          setVehicleModalOpened(true);
        },
      };
      temp.push(tempObj);
    }
    temp.push({
      imageSrc: require('../../../assets/images/plus.png'),
      imageStyle: {width: 30, height: 30},
      onPress: () => navigation.navigate("VehicleConfig"),
    })
    setGarageInfo(temp);

  }, [auth]);

  const { width } = useWindowDimensions();

  const { id, email, name, vehicleConfig } = user;

  const [vehicleSelected, setVehicleSelected] = useState(0);

  const [garageInfo, setGarageInfo] = useState([]);

  const [editProfile, setEditProfile] = useState(false);

  function EnableEditProfile(enabled) {
    if (!enabled) {
      updateUser({
        ...auth.user,
        nickname: user.name,
        email: user.email,
        currentVehicle: user.currentVehicle,
      });
      toast.show("", {
        title: i18n.t("reportToast.title"),
        message: i18n.t("reportToast.message"),
        type: "custom_type",
        location: "report",
      });
    }
    setEditProfile(enabled);
  }

  const onChangeText = (text, name) => {
    setUser({
      ...user,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={customStyle.blockContainer}>
          {/* Imagen de perfil */}
          <CustomButton
            customStyles={styles.editButton}
            onPress={() => EnableEditProfile(!editProfile)}
            imageSrc={require("../../../assets/images/pencil.png")}
            imageStyle={{ width: "100%", height: "100%" }}
          />
          <View style={styles.uploadImage}>
            <UploadImage 
              editable={editProfile}
            />
          </View>
          {/* Nombre de perfil */}
          <TextEditableLabel
            editable={editProfile}
            ChangeText={(text) => onChangeText(text, "name")}
            textValue={name}
            normalStyle={[customStyle.title, {textAlign:"center", fontSize:20}]}
            editableStyle={[customStyle.formInputText, {marginBottom: 10, textAlignVertical:"center"}]}
          />
          <TextEditableLabel
            editable={editProfile}
            ChangeText={(text) => onChangeText(text, "email")}
            textValue={email}
            normalStyle={[customStyle.normalText, {textAlign:"center", fontSize:15}]}
            editableStyle={[customStyle.formInputText, {textAlignVertical:"center"}]}
          />
        </View>
        <View style={styles.garageContainer}>
          {editProfile ? (
              <Text style={[customStyle.title]}>
                {i18n.t("profile.changeVehicle")}
              </Text>
            ) : (
              <Text style={[customStyle.title]}>{i18n.t("profile.yourVehicle")}</Text>
            )}
          <ButtonTable
            buttonsInfo={garageInfo}
            rowSize={3}
            currentSelected={user.currentVehicle}
          />
        </View>
      </ScrollView>
      <CarInfoModal
        isVisible={vehicleModalOpened}
        onHandleAccept={() => setVehicleModalOpened(false)}
        onHandleFav={() => {
          setUser({ ...user, ["currentVehicle"]: vehicleSelected });
          updateUser({
            ...auth.user,
            currentVehicle: vehicleSelected,
          });
        }}
        isFav={user.currentVehicle == vehicleSelected}
        vehicleInfo={vehicleConfig[vehicleSelected]}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  profileContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
    
  },
  uploadImage: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    alignSelf: "center",
    padding: 10,

  },
  informationContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  languageButtons: {
    margin: 20,
    width: "50%",
    alignSelf: "center",
  },
  button: {
    margin: 10,
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    alignSelf: "center",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  editableName: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 25,
    alignSelf: "center",
  },
  editableSubtitle: {
    fontSize: 18,
    marginBottom: 25,
    borderWidth: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  secondaryText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
  },
  image: {
    tintColor: "#16345D",
    alignSelf: "center",
  },
  imageC: {
    marginLeft: 50,
  },
  editButton: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "#ffffff00",
    alignSelf: "flex-end",
  },
  addButton: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#5CB362",
    borderRadius: 100 / 5,
    width: "45%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  garageContainer: {
    marginTop: 30,
  },
  buttonBar: {
    marginTop: "5%",
    width: "100%",
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export { ProfileScreen };
