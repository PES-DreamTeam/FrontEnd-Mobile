import React from "react";
import { StyleSheet, Pressable, View, Image, Text } from "react-native";

function ChargeStationInfo(props) {
  var vehicleImages = [
    require("../../../../../assets/images/chargerTypes/chargerType_1.png"),
    require("../../../../../assets/images/chargerTypes/chargerType_2.png"),
    require("../../../../../assets/images/chargerTypes/chargerType_3.png"),
    require("../../../../../assets/images/chargerTypes/chargerType_4.png"),
  ];

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
              <Image
                source={require("../../../../../assets/images/icons/carIcon.png")}
                style={styles.vehicleIcon}
              />
              <Text style={styles.availabilityText}>
                {GetAvailableSocketsCar()}/{GetTotalSocketsCar()}
              </Text>
            </View>
            <View style={styles.socketsList}>
              {GetAllSocketTypesCar().map((socket, index) => (
                <Image
                  source={vehicleImages[socket - 1]}
                  style={styles.socketImage}
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
              <Image
                source={require("../../../../../assets/images/icons/motoIcon.png")}
                style={styles.vehicleIcon}
              />
              <Text style={styles.availabilityText}>
                {GetAvailableSocketsMoto()}/{GetTotalSocketsMoto()}
              </Text>
            </View>
            <View style={styles.socketsList}>
              {GetAllSocketTypesMoto().map((socket, index) => (
                <Image
                  source={vehicleImages[socket - 1]}
                  style={styles.socketImage}
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
    maxWidth: "80%",
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

  },
  socketsTypesContent: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  socketsList: {
    height: 50,
    flexDirection: "row",
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
    height: 50,
    width: 47,
    marginLeft: 5,
  },
});

export default ChargeStationInfo;
