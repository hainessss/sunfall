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

  console.log('requestURL', requestURL);
};

/*
 * Transforms lat/lng array to coordiante array
 *
 * 1. Stringifys lat/lngs
 * 2. Adds Address, County, State
 */
const transformCoordinateList = coordinateList => {
  console.log('passedCoordinate', coordinateList);

  for (const coordinate of coordinateList) {

    makeGeocodeRequest(coordinate.lat, coordinate.lng);
  }

};

module.exports.transformCoordinateList = transformCoordinateList;
