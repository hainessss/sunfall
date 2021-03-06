import React from 'react';
import classnames from 'classnames';
import styles from './index.css';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { InfoWindow } from "react-google-maps";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const { sendCoordinateListToMLServer } = require('../../utils/coordinateTransformer');


const Map = withScriptjs(withGoogleMap(({markers, onClick, onSearchBoxMounted, onPlacesChanged, center}) => {
    return (
        <div>
            <GoogleMap
                defaultZoom={19}
                center={center}
                onClick={onClick}
            >
                    <SearchBox
                        ref={onSearchBoxMounted}
                        controlPosition={google.maps.ControlPosition.TOP_CENTER}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search"
                            style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            marginTop: `10px`,
                            padding: `0 12px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            }}
                        />
                        </SearchBox>
                <Marker position={{ lat: -34.397, lng: 150.644 }} />
                {
                    markers.map((marker, index) => {
                        return <Marker key={index} onclick={() => {console.log('index' , index)}} position={{ lat: marker.lat, lng: marker.lng }}>
                            <InfoWindow>
                                <div>asdf</div>
                            </InfoWindow>
                        </Marker>
                    })
                }
            </GoogleMap>
            <FloatingActionButton className={styles.action} onClick={sendCoordinateListToMLServer} backgroundColor="#CD3800" />
        </div>
    );
}));

export default Map;
