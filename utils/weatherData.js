const { error } = require("console");
const request =require("request");


const openWeatherMap = {
    BASE_URL: "https://api.tomorrow.io/v4/weather/realtime",
    SECRET_KEY: "zoHEtyPW3qzTysiy35iNjtzBKPCLhTzf"
};

const weatherData = (latitude, longitude, callback) => {
    const url = `${openWeatherMap.BASE_URL}?location=${latitude},${longitude}&apikey=${openWeatherMap.SECRET_KEY}`;
    
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback(true, "Unable to fetch data, please try again later: " + error);
        } else {
            callback(false, body);
        }
    });
};

module.exports = weatherData;
