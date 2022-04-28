import React from "react";
import ChargeStationInfo from "./chargeStationInfo";
import BikeStationInfo from "./bikeStationInfo";
import HighlightInfo from "./highlightInfo";

function GenericLocationInfo(props) {
    switch (props?.stationInfo?.objectType) {
      case "vehicleStation":
        return (
          <ChargeStationInfo
            stationInfo={props.stationInfo}
          />
        );
      case "bikeStation":
        return (
          <BikeStationInfo
            stationInfo={props.stationInfo}
          />
        );
      default:
        return <HighlightInfo />;
    }
  };


  export default GenericLocationInfo;