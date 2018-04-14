const request = require('request');

const GOOGLE_PLACES = {
  URL: 'https://maps.googleapis.com',
  GEOCODE_URI: 'maps/api/geocode/json',
  LAT_LNG: 'latlng',
  KEY: 'key',
}

const GOOGLE_PLACES_SECRET_KEY = 'YOUR_API_KEY'


const transformedCoordinateList = [];

/*
 *  Helper function to help find administrative types in Google Places response.
 */
const searchForType = (nameKey, myArray) => {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].types[0] === nameKey) {
            return myArray[i];
        }
    }
}

/*
 * Makes a reuqest to Google Places API and adds a transformed coordinate object to list
 *
 * 1. Stringifys lat/lngs
 * 2. Adds address, county, state
 *
 */
const makeGeocodeRequest = (lat, lng) => {
  const requestURL = `${GOOGLE_PLACES.URL}/${GOOGLE_PLACES.GEOCODE_URI}?${GOOGLE_PLACES.LAT_LNG}=${lat},${lng}`;

  if (!GOOGLE_PLACES_SECRET_KEY) {
    console.log('ERROR: No Google Places API KEY found. Please add your API key.');
    return;
  }

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

    const jsonBody = JSON.parse(body);

    if (jsonBody.status === 'OVER_QUERY_LIMIT') {
      console.log('ERROR: Google Places blocked request becuase key is over limit.');
      return;
    }

    const geocodedCoordinate = {};
    geocodedCoordinate.lat = lat.toString();
    geocodedCoordinate.lng = lat.toString();

    if (jsonBody && jsonBody.results && jsonBody.results[0] && jsonBody.results[0].formatted_address) {
      const formattedAddress = jsonBody.results[0].formatted_address;

      geocodedCoordinate.formattedAddress = formattedAddress;
    }

    if (jsonBody && jsonBody.results && jsonBody.results[0] && jsonBody.results[0].address_components) {
      const addressComponents = jsonBody.results[0].address_components;

      let state = searchForType('administrative_area_level_1', addressComponents);
      if (state) {
        state = state.short_name;
      }

      let county = searchForType('administrative_area_level_2', addressComponents);
      if (county) {
        county = county.short_name;
      }

      geocodedCoordinate.state = state;
      geocodedCoordinate.county = county;
    }

    console.log('LOG: Coordinate added to list:', geocodedCoordinate);
    transformedCoordinateList.push(geocodedCoordinate);

    return geocodedCoordinate;
  });
};

/*
 * Transforms lat/lng array to coordinate array
 */
const transformCoordinateList = coordinateList => {
  for (const coordinate of coordinateList) {
    makeGeocodeRequest(coordinate.lat, coordinate.lng);
  }
};

const sendCoordinateListToMLServer = () => {
  console.log('LOG: Sending coordinate list to ML server', transformedCoordinateList.length);

  // TODO: Send coordinate list to ML server.
  // In the meantime mocking return response.``
  const mockResponseList = [];
  const ROOF_TYPES = ['Metal', 'Comp Shingle', 'Flat Tile', 'Round Tile'];
  for (const coord of transformedCoordinateList) {
    const rand0to3 = Math.floor(Math.random() * 3);
    const isPool = Math.floor(Math.random() * 2) ? true : false;
    const isSolar = Math.floor(Math.random() * 2) ? true : false;

    const mockResponseObject = {
       lat: coord.lat,
       lng: coord.lng,
       isPool,
       roofType: ROOF_TYPES[rand0to3],
       isSolar,
    };
    mockResponseList.push(mockResponseObject);
  }
  console.log('LOG: Returning a MOCK RESPONSE until endpoint is up.', mockResponseList);
  return mockResponseList;
}

module.exports.transformCoordinateList = transformCoordinateList;
module.exports.sendCoordinateListToMLServer = sendCoordinateListToMLServer;
