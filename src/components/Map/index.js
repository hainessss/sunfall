import React from 'react';
import classnames from 'classnames';
import styles from './index.css';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from "react-google-maps"

const Map = withScriptjs(withGoogleMap(({markers, onClick}) => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
            onClick={onClick}
        >
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
      </GoogleMap>
    );
}));

export default Map;
