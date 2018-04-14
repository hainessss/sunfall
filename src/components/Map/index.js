import React from 'react';
import classnames from 'classnames';
import styles from './index.css';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from "react-google-maps";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const Map = withScriptjs(withGoogleMap(({markers, onClick, onSearchBoxMounted, onPlacesChanged}) => {
    return (
        <GoogleMap
            defaultZoom={19}
            defaultCenter={{ lat: 37.445843, lng: -122.131141 }}
            onClick={onClick}
        >
                <SearchBox
                    ref={onSearchBoxMounted}
                    controlPosition={google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        marginTop: `27px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        }}
                    />
                    </SearchBox>
            <Marker position={{ lat: 37.445843, lng: -122.131141 }} />
            {
                markers.map((marker, index) => {
                    return <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
                })
            }
      </GoogleMap>
    );
}));

export default Map;
