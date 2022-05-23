import React, {useState} from "react";
import { StyleSheet, Pressable, View, Image, Text } from "react-native";
import CustomProgressBar from "../../../../utils/customProgressBar";

function ChargeStationInfo(props) {
  const [vehicleImages, setVehicleImages] = useState([
    require("../../../../../assets/images/chargerTypes/chargerType_1.png"),
    require("../../../../../assets/images/chargerTypes/chargerType_2.png"),
    require("../../../../../assets/images/chargerTypes/chargerType_3.png"),
    require("../../../../../assets/images/chargerTypes/chargerType_4.png"),
  ]);

  const customStyle = require("../../../../utils/customStyleSheet");

  const GetTotalSockets = (vehicleType) => {
    let sockets = props?.stationInfo?.data.sockets;
    let total = 0;
    for (let i = 0; i < sockets.length; ++i) {
      if (sockets[i].vehicle_type == vehicleType) {
        total++;
      }
    }
    return total;
  };

  const GetTotalSocketsCar = () => {
    return GetTotalSockets(0);
  };

  const GetTotalSocketsMoto = () => {
    return GetTotalSockets(1);
  };

  const GetAvailableSockets = (vehicleType) => {
    let sockets = props?.stationInfo?.data.sockets;
    let available = 0;
    for (let i = 0; i < sockets.length; ++i) {
      if (
        sockets[i].vehicle_type == vehicleType &&
        sockets[i].socket_state == 0
      ) {
        available++;
      }
    }
    return available;
  };

  const GetAvailableSocketsCar = () => {
    return GetAvailableSockets(0);
  };

  const GetAvailableSocketsMoto = () => {
    return GetAvailableSockets(1);
  };

  const GetAllSocketImages = () => {
    let types = [];
    for(let i = 1; i <= 4; ++i) {
      types.push("" + i);
    }
    return types;
  };

  const GetAllSocketTypes = (vehicleType) => {
    let sockets = props?.stationInfo?.data.sockets;
    let types = [];
    let found = false;
    for (let i = 0; i < sockets.length; ++i) {
      let temp = sockets[i].socket_type.split(",");
      if (vehicleType == sockets[i].vehicle_type) {
        for (let j = 0; j < temp.length; ++j) {
          found = false;

          for (let k = 0; k < types.length; ++k) {
            if (types[k] == temp[j]) {
              found = true;
              break;
            }
          }
          if (!found) {
            types.push(temp[j]);
          }
          found = false;
        }
      }
    }
    return types;
  };

  const GetAllSocketTypesCar = () => {
    return GetAllSocketTypes(0);
  };

  const GetAllSocketTypesMoto = () => {
    return GetAllSocketTypes(1);
  };

  return (
    <View style={styles.chargingStationContent}>
      <View style={styles.chargersDisplay}>
        {GetTotalSocketsCar() > 0 ? (
          <View style={styles.socketsTypesContent}>
            <View style={styles.chargerAvailability}>
              <View style={{width: "45%"}}>
                <Image
                  source={require("../../../../../assets/images/icons/carIcon.png")}
                  style={styles.vehicleIcon}
                />
              </View>
              <View style={{width: "45%", justifyContent: 'center'}}>
                <CustomProgressBar
                  percent={GetAvailableSocketsCar() / GetTotalSocketsCar() * 100}
                  text={GetAvailableSocketsCar() + "/" + GetTotalSocketsCar()}
                  backgroundStyle={{height: 20, width: '100%'}}
                  fillStyle={{height: 20}}
                  textStyle={{marginTop: -20}}
                />
              </View>
            </View>
            <View style={styles.socketsList}>
              {GetAllSocketImages().map((socket, index) => (
                <Image
                  source={vehicleImages[socket - 1]}
                  style={[styles.socketImage, 
                    GetAllSocketTypesCar().includes(socket) ? {opacity: 1} : {opacity: 0.2}]}
                  key={index}
                />
              ))}
            </View>
          </View>
        ) : (
          <View />
        )}
        {GetTotalSocketsMoto() > 0 ? (
          <View style={styles.socketsTypesContent}>
            <View style={styles.chargerAvailability}>
              <View style={{width: "45%"}}>
                <Image
                  source={require("../../../../../assets/images/icons/motoIcon.png")}
                  style={styles.vehicleIcon}
                />
              </View>
              <View style={{width: "45%", justifyContent: 'center'}}>
                <CustomProgressBar
                  percent={GetAvailableSocketsMoto() / GetTotalSocketsMoto() * 100}
                  text={GetAvailableSocketsMoto() + "/" + GetTotalSocketsMoto()}
                  backgroundStyle={{height: 20, width: '100%'}}
                  fillStyle={{height: 20}}
                  textStyle={ {marginTop: -20}}
                />
              </View>
            </View>
            <View style={styles.socketsList}>
              {GetAllSocketImages().map((socket, index) => (
                <Image
                  source={vehicleImages[socket - 1]}
                  style={[styles.socketImage, 
                    GetAllSocketTypesMoto().includes(socket) ? {opacity: 1} : {opacity: 0.2}]}
                  key={index}
                />
              ))}
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chargingStationContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  chargersDisplay: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

  },
  chargerAvailability: {
    textAlign: "center",
    justifyContent: "center",
    width: "50%",
    flexDirection: "row",

  },
  socketsTypesContent: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  socketsList: {
    height: "100%",
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleIcon: {
    height: 50,
    width: 50,
    marginTop: 10,
    marginLeft: 5,
  },
  availabilityText: {
    alignSelf: "center",
  },
  favouriteButton: {
    marginLeft: "auto",
  },
  favIcon: {
    height: 36,
    width: 36,
  },
  likeIcon: {
    height: 36,
    width: 36,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    marginLeft: "auto",
  },
  socketImage: {
    height: 31,
    width: 30,
    marginLeft: 5,
  },
});

export default ChargeStationInfo;
