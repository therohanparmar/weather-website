const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=8b1a3528fa5746dfc3614f94fd3428d9&query=' + latitude + ',' + longitude +'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // callback( undefined, ' It is currently temprature is  ' + body.current.temperature + '°c.' )
            callback( undefined,'Temperature: ' + body.current.temperature + '°c')
        }
    })
}


// 8b1a3528fa5746dfc3614f94fd3428d9
module.exports = forecast