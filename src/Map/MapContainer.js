import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

import { mapOptions, markers } from '../Components/default';
import { searchByLocations } from '../Utils/search';
import MarkersRenderer from './MarkersRenderer';
import TravelModeRenderer from '../Components/TravelModeRenderer';
import ButtonRenderer from '../Components/ButtonRenderer';

class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      },
      markers,
      nearestMarker: [],
      isTravelMode: false
    }
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            userLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        }
      )
    }
  }

  onChangeTravelMode = (e) => {
    this.calculateAndDisplayRoute(e.target.value)
  }

  calculateAndDisplayRoute = (selectedMode = 'DRIVING') => {
    const DirectionsService = new window.google.maps.DirectionsService({ suppressMarkers: false });

    DirectionsService.route({
      origin: new window.google.maps.LatLng(16.455263, 107.59596929999998),
      destination: new window.google.maps.LatLng(16.4685374, 107.59870849999993),
      travelMode: window.google.maps.TravelMode[selectedMode],
      waypoints: [{
        location: new window.google.maps.LatLng(16.456184, 107.58093600000007),
        // stopover: false
      },
      {
        location: new window.google.maps.LatLng(16.4657437, 107.59208860000001),
        // stopover: false
      }]
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  onClickTravelButton = () => {
    const { userLocation } = this.state;
    const searchLocations = searchByLocations(markers, userLocation, 2);
    this.setState({ isTravelMode: true, nearestMarker: searchLocations});
  }

  render() {
    const { userLocation, markers, directions, isTravelMode } = this.state;
    const google = window.google;

    return (<GoogleMap
      centerAroundCurrentLocation
      defaultZoom={15}
      center={userLocation}
      options={mapOptions}
    >
      {isTravelMode && <TravelModeRenderer google={google} onChange={() => this.onChangeTravelMode} />}
      {!isTravelMode && <ButtonRenderer onClick={() => this.onClickTravelButton} text={`Travel with 5 poits near me`} position={google.maps.ControlPosition.TOP_LEFT} />}
      <ButtonRenderer onClick={() => this.onClickAddButton} text={`Add new marker`} position={google.maps.ControlPosition.BOTTOM_LEFT} />
      <MarkersRenderer markers={markers} positionCenter={userLocation} google={google} />
      {isTravelMode && !_.isEmpty(directions) && <DirectionsRenderer directions={directions} />}
    </GoogleMap>)
  }
}
export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCLsHXXsmgBjJ5-9EjM8fVQhpDDJ10jM4M&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
)(MapContainer);