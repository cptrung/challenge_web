import _ from "lodash";
import React from "react";
import { Marker } from "react-google-maps";

const MarkersRenderer = ({ markers, positionCenter }) => {
  let arrayMarker = [];

  arrayMarker.push(<Marker position={positionCenter} key={`marker-center`} />);
  _.forEach(markers, (item, index) => {
    const position = { lat: item.lat, lng: item.lng }
    const icon = { url: `http://localhost:5000/${item.icon}`, scaledSize: { width: 32, height: 32 } };
    const marker = <Marker position={position} key={`marker-${index.toString()}`} icon={icon}/>
    arrayMarker.push(marker);
  });

  return arrayMarker;
}

export default MarkersRenderer;