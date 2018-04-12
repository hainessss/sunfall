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

    onClick = (e) => {
        console.log('map click', e);
    }

    render() {
        return (
                <Map 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onClick={this.onClick}
                />
        );
    }
}

MapContainer.defaultProps = {

};

MapContainer.propTypes = {
}

export default MapContainer;
