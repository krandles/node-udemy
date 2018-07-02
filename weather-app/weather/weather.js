const request = require('request')

const darkSkyKey = '6b6f9e0ba066d605ca11adeba7cb6673'

const fetchWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.forecast.io/forecast/${darkSkyKey}/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      callback('unable to fetch weather')
    }
  })
}

module.exports = {
  fetchWeather
}