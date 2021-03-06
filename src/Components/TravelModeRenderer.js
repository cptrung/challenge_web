import React from "react";
import MapControl from '../Map/MapControl';

const TravelModeRenderer = ({ google, onChange }) => {
    return (
      <MapControl position={google.maps.ControlPosition.TOP_LEFT}>
        <div style={{ position: 'relative', top: '10px', height: '40px'}}>
          <b style={{color: 'white'}}>Mode of Travel: </b>
          <select id="mode" onChange={onChange && onChange()} style={{ height: '40px'}}>
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
          </select>
        </div>
      </MapControl>
    )
  }

  export default TravelModeRenderer;