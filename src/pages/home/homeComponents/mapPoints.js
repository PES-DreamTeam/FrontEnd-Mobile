import { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import useAuth from '../../../hooks/useAuth';

export default ({chargePoints, OpenStationInfo}) => {
    const stationColors = [
        '#629C44', //VERDE (>=90%)
        '#FFE608', //AMARILLO (>= 70%)
        '#FF930F', //NARANJA (>= 1)
        '#D41F31', //ROJO (0)
        '#878787', //GRIS (?),
        '#1D69A6'  //AZUL
    ];

    const { auth } = useAuth();

    const IsFavStation = (station) => {
        let ret = auth?.user?.favourites?.includes(station?.id?.toString());
        return ret;
    }

    const GetColorStation = (station) => { 
        if(station !== null) {
        let availableStations = 0;
        let countStations = 0;
        let fav = IsFavStation(station);
        if(station.objectType == "bikeStation") {
            if(fav) {
                return (require( '../../../../assets/images/pins/favPinBlue.png'));
            }
            else {
                return (require( '../../../../assets/images/pins/normalPinBlue.png'));
            }
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
            if(fav) {
                return (require( '../../../../assets/images/pins/favPinGreen.png'));
            }
            else {
                return (require( '../../../../assets/images/pins/normalPinGreen.png'));
            }
        }
        if(availableStations / countStations >= 0.7) {
            if(fav) {
                return (require( '../../../../assets/images/pins/favPinYellow.png'));
            }
            else {
                return (require( '../../../../assets/images/pins/normalPinYellow.png'));
            }
        }
        else {
            if(fav) {
                return (require( '../../../../assets/images/pins/favPinRed.png'));
            }
            else {
                return (require( '../../../../assets/images/pins/normalPinRed.png'));
            }
        }
        }
    }
    return(
        chargePoints?.map(chargePoint => 
            <Marker
                key={chargePoint[1].id}
                onPress={()=>OpenStationInfo(chargePoint[1])}
                pinColor={GetColorStation(chargePoint[1])}
                image={GetColorStation(chargePoint[1])}
                coordinate={{
                    latitude: chargePoint[1].lat,
                    longitude: chargePoint[1].lng
                }}
                title={chargePoint[1].name}
            />
        )
    )
}