const request = require('request');

const googleApiKey = 'AIzaSyCI6MVNeV4DmvZLr2iH_nOuHmde3HTXk7E'

const geocodeAddress = (address, callback) => { 
  const encodedAddress = encodeURIComponent(address)

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to google maps')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('No results found')
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  })
}


module.exports = {
  geocodeAddress
}