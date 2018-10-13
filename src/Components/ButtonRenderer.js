import React from "react";
import MapControl from '../Map/MapControl';
import { ButtonContainer, Button } from './styles';

const ButtonRenderer = (props) => {
  const { onClick, text, position, style } = props;

    return (
      <MapControl position={position}>
        <ButtonContainer>
          <Button onClick={onClick && onClick()}>{text}</Button>
        </ButtonContainer>
      </MapControl>
    )
  }

  export default ButtonRenderer;