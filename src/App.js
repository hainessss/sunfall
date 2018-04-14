import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';
import MapContainer from './components/MapContainer';
import { GoogleMap, Marker } from "react-google-maps"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className={styles.appHeader}>
          </header>
          <MapContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
