const request = require('request')

const googleApiKey = 'AIzaSyCI6MVNeV4DmvZLr2iH_nOuHmde3HTXk7E'

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address)

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('unable to connect to google maps')
      } else if (body.status === 'ZERO_RESULTS') {
        reject('No results found')
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    })
  })
}

geocodeAddress('adsfasdfa').then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(errorMessage)
})