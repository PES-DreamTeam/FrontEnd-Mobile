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
import SettingsModal from "./profileComponents/settingsModal";
import Carousel from "react-native-snap-carousel";
import UploadImage from "./profileComponents/UploadImage";
import CustomButton from "../../utils/button";
import { useToast } from "react-native-toast-notifications";
import CustomModal from "../../utils/modal";
import ButtonTable from "../../utils/buttonTable";
import useUser from "../../hooks/useUser";

import useVehicleConfig from "../../hooks/useVehicleConfig";

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

  const {deleteVehicleConfig } = useVehicleConfig();

  const customStyle = require('../../utils/customStyleSheet');

  const { auth, updateUser } = useAuth();
  const { getUserInfo } = useUser();
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
    CreateGrid(user.vehicleConfig);
    setVehicleSelected(user.currentVehicle);
  }, [user]);

  useEffect(() => {
    if(editProfile && vehicleModalOpened) {
      setVehicleModalOpened(false);
    }
  }, [vehicleModalOpened]);

  useEffect(() => {
    setUser({
      id: auth.user._id,
      email: auth.user.email,
      name: auth.user.nickname,
      vehicleConfig: auth.user.vehicleConfig,
      currentVehicle: auth.user.currentVehicle ?? 0,
    });
  }, [auth]);

  const { width } = useWindowDimensions();

  const { id, email, name, vehicleConfig } = user;

  const [vehicleSelected, setVehicleSelected] = useState(0);

  const [garageInfo, setGarageInfo] = useState([]);

  const [editProfile, setEditProfile] = useState(false);

  const [toDeleteElement, setToDeleteElement] = useState(-1);

  const [settingsModalOpened, setSettingsModalOpened] = useState(false);

  async function DeletVehicle() {
    let temp = JSON.parse(JSON.stringify(user.vehicleConfig));
    let tempSelected = user.currentVehicle;
    console.log(tempSelected, vehicleSelected);
    if(tempSelected == vehicleSelected) {
      tempSelected = 0;
    }
    console.log(tempSelected, vehicleSelected);
    
    await deleteVehicleConfig(user.vehicleConfig[vehicleSelected].numberPlate);
    temp.splice(toDeleteElement, 1);
    setUser({
      ...user,
      vehicleConfig: temp,
      currentVehicle: tempSelected,
    });
    
  }

  function GoToVehicleConfigScreen () {
    if(!editProfile) {
      navigation.navigate("VehicleConfig");
    }
  }

  function CreateGrid(array) {
    let temp = [];
    for(let i = 0; i < array.length; i++){
      let tempObj = {
        canBeDeleted: true,
        imageSrc: vehicleImages[array[i].vehicleType],
        imageStyle: {width: '100%', height:'50%', tintColor: array[i].color, alignSelf: "center"},
        onPress: () => {
          setVehicleSelected(i);
          setVehicleModalOpened(true);
        },
      };
      temp.push(tempObj);
    }
    temp.push({
      canBeDeleted: false,
      imageSrc: require('../../../assets/images/plus.png'),
      imageStyle: {width: 30, height: 30},
      onPress: () => GoToVehicleConfigScreen(),
    })
    setGarageInfo(temp);
  }

  async function enableEditProfile(enabled) {
    if (!enabled) {
      await updateUser({
        ...auth.user,
        nickname: user.name,
        email: user.email,
        currentVehicle: user.currentVehicle,
        vehicleConfig: user.vehicleConfig,
      });
      
      toast.show("", {
        title: i18n.t("reportToast.title"),
        message: i18n.t("reportToast.message"),
        type: "custom_type",
        location: "report",
      });
    }
    setEditProfile(enabled);
    setVehicleModalOpened(false);
  }

  const onChangeText = (text, name) => {
    setUser({
      ...user,
      [name]: text,
    });
  };

  const OpenSettingsModal = () => {
    setSettingsModalOpened(true);
    setEditProfile(false);
  }


  return (
    <View style={[customStyle.mainContainer,{height: "100%"}]}>
      <ScrollView>
        <View style={customStyle.minimalistBlockContainer}>
          <View style={styles.topRow}>
          <CustomButton
            customStyles={styles.editButton}
            onPress={() => OpenSettingsModal()}
            imageSrc={require("../../../assets/images/icons/settings.png")}
            imageStyle={{ width: "100%", height: "100%" }}
            />
          <CustomButton
            customStyles={styles.editButton}
            onPress={() => enableEditProfile(!editProfile)}
            
            imageSrc={editProfile ? require("../../../assets/images/icons/save.png") : require("../../../assets/images/icons/pencil.png")}
            imageStyle={{ width: "100%", height: "100%" }}
            />
          </View>
          {/* Imagen de perfil */}
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
        <View style={[customStyle.coolBlockContainer]}>
          <View style={customStyle.coolBlockTitleContainer}>
            <Text style={[customStyle.title]}>{i18n.t("profile.yourVehicle")}</Text>
          </View>
          <View style={customStyle.coolBlockImageContainer}>
            <Image
              source={
                require("../../../assets/images/garage.png")
              }
              style={customStyle.coolBlockImage}
            />
          </View>
          <View style={customStyle.blockContentContainer}>
            <ButtonTable
              deleteable={editProfile}
              buttonsInfo={garageInfo}
              rowSize={3}
              currentSelected={user.currentVehicle}
              onDeleteElement={setToDeleteElement}
            />
          </View>
        </View>
      </ScrollView>
      <CarInfoModal
        isVisible={vehicleModalOpened && !editProfile}
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

      <CustomModal
        isVisible={toDeleteElement != -1}
        handleAccept={() => {
          DeleteVehicle(() => DeleteVehicle());
          setToDeleteElement(-1);
        }}
        handleCancel={() => {
          setToDeleteElement(-1);
        }}
        title={i18n.t("profile.deleteVehicle")}
      />

      <SettingsModal
        isVisible={settingsModalOpened}
        handleCancel={() => {
          setSettingsModalOpened(false);
        }}
        title={i18n.t("profile.deleteVehicle")}
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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
