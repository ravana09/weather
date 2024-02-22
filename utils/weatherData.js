const { error } = require("console");
const request =require("request");

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "95562096dd46f01523970abff224e39e"
};

const weatherData = (address, callback) => {
    const url = openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + openWeatherMap.SECRET_KEY;
    console.log(url);
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(true, "Unable to fetch data, please try again later: " + error);
        } else {
            callback(false, response.body);
        }
    });
};

module.exports = weatherData;