const request = require('request');

const GOOGLE_PLACES = {
  URL: 'https://maps.googleapis.com',
  GEOCODE_URI: 'maps/api/geocode/json',
  LAT_LNG: 'latlng',
  KEY: 'key',
}

const GOOGLE_PLACES_SECRET_KEY = 'YOUR_API_KEY'

/*
 * Makes a reuqest to Google Places API and returns a Google Places Object
 *
 */
const makeGeocodeRequest = (lat, lng) => {
  const requestURL = `${GOOGLE_PLACES.URL}/${GOOGLE_PLACES.GEOCODE_URI}?${GOOGLE_PLACES.LAT_LNG}=${lat},${lng}`;

  request(requestURL, (error, response, body) => {
    if (!response) {
      console.log('ERROR: No response returned from Google Places.');
      return;
    }

    if (response.statusCode !== 200) {
      console.log('ERROR: None success response returned from Google Places:', response);
      return;
    }

    if (error) {
      console.log('ERROR: Error returned from Google Places:', error);
      return;
    }

    console.log('body:', body);
    return 'success'; // TODO: create coordinate from list.
  });

  console.log('requestURL', requestURL);
};

/*
 * Transforms lat/lng array to coordiante array
 *
 * 1. Stringifys lat/lngs
 * 2. Adds Address, County, State
 */
const transformCoordinateList = coordinateList => {
  const transformedCoordinateList = [];

  for (const coordinate of coordinateList) {

    transformedCoordinate = makeGeocodeRequest(coordinate.lat, coordinate.lng);
    if (transformedCoordinate) {
      transformedCoordinateList.push(transformedCoordinate);
    }
  }

  console.log('transformedCoordinateList', transformedCoordinateList);
};

module.exports.transformCoordinateList = transformCoordinateList;
