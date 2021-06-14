const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWFya2VzZG8iLCJhIjoiY2twcjFmZzV0MDN6aTMxbW4wN2RraWNkZCJ9.bNBECpR19LyTIi6RmR60zQ&limit=1";
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("unable to connect");
    } else if (body.features.length === 0) {
      callback("Unable to find location");
    } else {
      const [lat, long] = body.features[0].center;
      callback(undefined, {
        lat: lat,
        long: long,
        placename: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
