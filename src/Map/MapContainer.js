import React from "react";
import _ from "lodash";
import axios from 'axios';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

import { mapOptions } from '../Components/default';
import { searchByLocations } from '../Utils/search';
import MarkersRenderer from './MarkersRenderer';
import TravelModeRenderer from '../Components/TravelModeRenderer';
import ButtonRenderer from '../Components/ButtonRenderer';
import AddNewModal from '../Components/AddNewModal';

class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      },
      markers: [],
      nearestMarker: [],
      isTravelMode: false,
      isShowModal: false
    }
  }

  componentDidMount() {
    this.initData();
    this.getGeoLocation();
  }

  initData = () => {
    const url = 'http://localhost:5000/marker';
    axios.get(url).then(response => {
      const { markers } = response.data || [];
      this.setState({ markers })
    });
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

  calculateRouteFromMarker = () => {
    const { nearestMarker } = this.state;
    const google = window.google;

    const firstMarker = _.first(nearestMarker);
    const origin = new google.maps.LatLng(firstMarker.lat, firstMarker.lng);

    const lastMarker = _.last(nearestMarker);
    const destination = new google.maps.LatLng(lastMarker.lat, lastMarker.lng);

    const remainMarker = _.slice(nearestMarker, 1, nearestMarker.length - 1);
    const waypoints = _.map(remainMarker, (marker) => {
      return {
        location: new google.maps.LatLng(marker.lat, marker.lng),
        // stopover: false
      }
    });

    return {
      origin,
      destination,
      waypoints
    }
  }

  calculateAndDisplayRoute = (selectedMode = 'DRIVING') => {
    const DirectionsService = new window.google.maps.DirectionsService({suppressMarkers : true });

    const markers = this.calculateRouteFromMarker();

    DirectionsService.route({
      origin: markers.origin,
      destination: markers.destination,
      travelMode: window.google.maps.TravelMode[selectedMode],
      waypoints: markers.waypoints,
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
    const { userLocation, markers } = this.state;
    const searchLocations = searchByLocations(markers, userLocation, 5);
    this.setState({ isTravelMode: true, nearestMarker: searchLocations },() => {
      this.calculateAndDisplayRoute();
    });
  }

  openModal = () => {
    this.setState({ isShowModal: true })
  }

  closeModal = () => {
    this.setState({ isShowModal: false })
  }

  handleUpdateMarkers = (marker) => {
    const { markers } = this.state;
    markers.push(marker);
    this.setState({ markers });
  }

  render() {
    const { userLocation, markers, directions, isTravelMode, isShowModal } = this.state;
    const google = window.google;

    const travelModeRender = isTravelMode && <TravelModeRenderer google={google} onChange={() => this.onChangeTravelMode} />;
    const travelButtonRender = !isTravelMode && <ButtonRenderer onClick={() => this.onClickTravelButton} text={`Travel with 5 poits near me`} position={google.maps.ControlPosition.TOP_LEFT} />;
    const directionsRender = isTravelMode && !_.isEmpty(directions) && <DirectionsRenderer directions={directions} />;
    const buttonAddNew = <ButtonRenderer onClick={() => this.openModal} text={`Add new marker`} position={google.maps.ControlPosition.BOTTOM_CENTER}/>;
    const markerRender = <MarkersRenderer markers={markers} positionCenter={userLocation} google={google} />;

    return (
      <div>
        <GoogleMap
          centerAroundCurrentLocation
          defaultZoom={15}
          center={userLocation}
          options={mapOptions}
        >
          {travelModeRender}
          {travelButtonRender}
          {buttonAddNew}
          {markerRender}
          {directionsRender}
        </GoogleMap>
        <AddNewModal visible={isShowModal} closeModal={this.closeModal} onUpdateMarker={this.handleUpdateMarkers}/>
      </div>
    )
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