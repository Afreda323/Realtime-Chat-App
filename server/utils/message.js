const GOOGLE_URL = "https://www.google.com/maps?q=";
const moment = require('moment')
const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}
const generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `${GOOGLE_URL}${lat},${lon}`,
        createdAt: moment().valueOf()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}