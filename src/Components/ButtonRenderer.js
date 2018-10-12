import React from "react";
import MapControl from '../Map/MapControl';

const ButtonRenderer = (props) => {
  const { onClick, text, position } = props;
    return (
      <MapControl position={position}>
        <div style={{ position: 'relative', top: '10px', height: '40px', backgroundColor: 'red' }}>
          <button onClick={onClick && onClick()}>{text}</button>
        </div>
      </MapControl>
    )
  }

  export default ButtonRenderer;