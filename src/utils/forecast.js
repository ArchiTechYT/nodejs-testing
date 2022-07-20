const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3aa813ef531327f2b1b35a20fe18d82c&query=" +
    lat +
    "," +
    long;

  //   const url =
  //     "http://api.weatherstack.com/current?access_key=3aa813ef531327f2b1b35a20fe18d82c&query=37.8267,-122.4233";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location server!", undefined); // undefined for data variable
    } else if (body == 0) {
      callback("Unable to find location, please try other serach!", undefined);
    } else {
      callback(
        undefined,
        "Location : " +
          body.location.name +
          " Description : " +
          body.current.weather_descriptions +
          " Temperature : " +
          body.current.temperature +
          " degrees"
      );
    }
  });
};

module.exports = forecast;
