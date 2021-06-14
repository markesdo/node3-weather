const request = require("postman-request");

const forecast = (lat, lo, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=061bb1ce44fbe3e385d34859dfe3c0e6&query=" +
    lo +
    "," +
    lat +
    "&unit=m";

  //   const url =
  //     "http://api.weatherstack.com/current?access_key=061bb1ce44fbe3e385d34859dfe3c0e6&query=40.7831,-73.9712&unit=s";

  request({ url, json: true }, (err, { body }) => {
    //const data = JSON.parse(res.body); // not necessary because json= true makes an obj immediatly
    if (err) {
      callback("Cannot connect to the weather service");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        temp: body.current.temperature,
        humidity: body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
