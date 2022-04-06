import { Marker } from 'react-native-maps';
export default ({chargePoints, OpenStationInfo}) => {
    const stationColors = [
        '#629C44', //VERDE (>=90%)
        '#FFE608', //AMARILLO (>= 70%)
        '#FF930F', //NARANJA (>= 1)
        '#D41F31', //ROJO (0)
        '#878787', //GRIS (?),
        '#1D69A6'  //AZUL
    ]
    const GetColorStation = (station) => {
        if(station !== null) {
        let availableStations = 0;
        let countStations = 0;
        if(station.objectType == "bikeStation") {
            return '#1D69A6';
        }
        if(station.objectType == "vehicleStation") {
            countStations = station.data.sockets.length;
            for (let i = 0; i < countStations; ++i) {
            if(station.data.sockets[i].socket_state == 0) {
                availableStations++;
            }
            }
        }
        if(availableStations / countStations >= 0.9) {
            return stationColors[0];
        }
        if(availableStations / countStations >= 0.7) {
            return stationColors[1];
        }
        else if(availableStations >= 1) {
            return stationColors[2];
        }
        else {
            return stationColors[3];
        }
        }
    }

    return(
        chargePoints?.map(chargePoint => 
            <Marker
                key={chargePoint[1].id}
                onPress={()=>OpenStationInfo(chargePoint[1])}
                pinColor={GetColorStation(chargePoint[1])}
                coordinate={{
                    latitude: chargePoint[1].lat,
                    longitude: chargePoint[1].lng
                }}
                title={chargePoint[1].name}
            />
        )
    )
}