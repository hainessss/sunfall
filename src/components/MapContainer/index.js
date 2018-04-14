import React from 'react';
import styles from './index.css';
import PropTypes from 'prop-types';
import Map from '../Map';

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
