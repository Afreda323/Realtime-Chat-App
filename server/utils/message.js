const GOOGLE_URL = "https://www.google.com/maps?q=";

const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}
const generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `${GOOGLE_URL}${lat},${lon}`,
        createdAt: new Date().getTime()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}