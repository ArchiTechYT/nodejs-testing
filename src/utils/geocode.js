const request = require("request");

// OSM Nominatim : "https://nominatim.openstreetmap.org/search?q=New York City&limit=1&format=json";
// further http agent setting required for OSM nominatim...

const geoCode = (adress, callback) => {
  const url =
    "https://nominatim.openstreetmap.org/search?q=" +
    adress +
    "&limit=1&format=json";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location server!", undefined); // undefined for data variable
    } else if (response.body == 0) {
      callback("Unable to find location, please try other serach!", undefined);
    } else {
      callback(undefined, {
        // following mapbox's format, however i dont have api access to it...
        latitude: 40.7306,
        longitude: -73.9352,
        location: "New York",
      });
    }
  });
};

module.exports = geoCode;
