import React from 'react';
import styles from './index.css';
import PropTypes from 'prop-types';
import Map from '../Map';
const { transformCoordinateList } = require('../../utils/coordinateTransformer');

/**
 * Enter description.
 *
 * @name MapContainer
 */
class MapContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            markers: []
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    onSearchBoxMounted = ref => {
        this.searchBox = ref;
    }

    onPlacesChanged = () => {

    }


    onClick = (e) => {
        const { markers } = this.state;
        console.log('map click', e);

        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const coordinate = {
          lat,
          lng,
        }

        // Transforming a single coordinate
        // TODO: Add to a list and transform only when full list is sent.
        transformCoordinateList([coordiante]);

        this.setState({
            markers: markers.concat([
                {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                }
            ])
        })
    }

    render() {
        const {markers} = this.state;

        return (
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onClick={this.onClick}
                    markers={markers}
                    onSearchBoxMounted={this.onSearchBoxMounted}
                    onPlacesChanged={this.onPlacesChanged}
                />
        );
    }
}

MapContainer.defaultProps = {

};

MapContainer.propTypes = {
}

export default MapContainer;
