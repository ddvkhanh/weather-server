const request = require('request')

const forecast = (pLatitude, pLongitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2dbf205bbb132dd5dec471ee6ef6563a/' + encodeURIComponent(pLatitude) + ',' + encodeURIComponent(pLongitude)

    request({ url, json: true }, (error, {body}) => {
        const {summary, temperature, temperatureHigh, temperatureLow, precipProbability} = body.currently
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try again with a different search term.', undefined)
        } else {
            callback(undefined,
                summary + ' It is currently ' + temperature + ' degrees out. The highest temperature is ' + temperatureHigh + 'and the lowest is' +temperatureLow+ '. There is a ' + precipProbability + '% chance of rain.'
            )
        }
    })
}

module.exports = forecast
