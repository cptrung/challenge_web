import React from "react";
import MapControl from '../Map/MapControl';
import { ButtonContainer, Button } from './styles';

const ButtonRenderer = (props) => {
  const { onClick, text, position } = props;
  let style = {}
  if( position === window.google.maps.ControlPosition.TOP_LEFT) {
    style = { paddingTop: '10px' }
  }
    return (
      <MapControl position={position}>
        <ButtonContainer style={style}>
          <Button onClick={onClick && onClick()}>{text}</Button>
        </ButtonContainer>
      </MapControl>
    )
  }

  export default ButtonRenderer;