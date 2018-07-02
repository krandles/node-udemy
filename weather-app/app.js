const yargs = require('yargs');
const axios = require('axios');

// const geocode = require('./geocode/geocode')
// const weather = require('./weather/weather')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'street address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address)
const googleApiKey = 'AIzaSyCI6MVNeV4DmvZLr2iH_nOuHmde3HTXk7E'
const darkSkyKey = '6b6f9e0ba066d605ca11adeba7cb6673'
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO RESULTS') {
    throw new Error('no results found')
  }
  let latitude = response.data.results[0].geometry.location.lat
  let longitude = response.data.results[0].geometry.location.lng
  let weatherUrl = `https://api.forecast.io/forecast/${darkSkyKey}/${latitude},${longitude}`
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherUrl)
}).then((response) => {
  let temperature = response.data.currently.temperature
  let apparentTemperature = response.data.currently.apparentTemperature
  console.log(`Temperature: ${temperature}, Apparent temperature: ${apparentTemperature}`)
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('unable to connect')
  } else {
    console.log(error.message)
  }
})

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage)
//   } else {
//     console.log(results.address)
//     weather.fetchWeather(results.latitude, results.longitude, (weatherErrorMessage, weatherResults) => {
//       if (errorMessage) {
//         console.log(weatherErrorMessage)
//       } else {
//         console.log(`Temperature: ${weatherResults.temperature}`)
//         console.log(`Apparent temperature: ${weatherResults.apparentTemperature}`)
//       }
//     })
//   }
// })

